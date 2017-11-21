import url from 'url';
import moment from 'moment';
import {EventEmitter} from 'events';

const ErrorCodes = {
    E_WS_UNESTABLISHED: 'E_WS_UNESTABLISHED',
    E_WS_SLEEP: 'E_WS_SLEEP',
    E_WS_WAIT_TIMEOUT: 'E_WS_WAIT_TIMEOUT'
};

class Deferred {
    /**
     * Polyfill for Promise.deferred()
     * @param {number} timeout
     */
    constructor(timeout) {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.fired = false;

        if (timeout) {
            setTimeout(() => {
                this.fired = true;
                this.reject(new Error(ErrorCodes.E_WS_WAIT_TIMEOUT));
            }, timeout);
        }
    }
}

export default class WsDriver extends EventEmitter {
    ws = null;
    isConnected = false;
    isSleep = true;
    last = moment();
    cid = 0;
    queue = new Map();
    observers = new Map();
    semaphore = false;

    /**
     * WS driver
     * @param {*} config
     */
    constructor(config) {
        super();

        this.config = config;
    }

    /**
     * Initialize method
     * @returns {Promise.<T>}
     */
    init() {
        setInterval(this.healthCheck, this.config.healthCheckInterval);
        setInterval(this.handleQueue, this.config.handleQueueInterval);

        return Promise.resolve();
    }

    /**
     * Health check worker
     */
    healthCheck = () => {
        const isDisconnected = !this.isConnected,
            lostActivity = moment() - this.last > this.config.activityTimeout;

        if (!this.isSleep && (isDisconnected || lostActivity)) this.destroy();
    };

    /**
     * Queue handle worker
     */
    handleQueue = () => {
        if (!this.semaphore && !this.isSleep && this.queue.size) {
            this.semaphore = true;

            if (this.isConnected) {
                const cid = this.getFirst(),
                    job = this.retrieveJob(cid),
                    data = this.retrieveData(cid);

                if (!job.fired) {
                    try {
                        this.send(data);
                        job.resolve(true);
                    }
                    catch (e) {
                        job.reject(e);
                    }
                }
            }

            this.semaphore = false;
            this.handleQueue();
        }
    };

    /**
     * Find first item in queue
     * @returns {number}
     */
    getFirst = () => {
        let result = 0;

        for (const cid of Array.from(this.queue.keys())) {
            if (!result || cid < result) result = cid;
        }

        return result;
    };

    /**
     * Retrieve job by cid
     * @param {*} cid
     * @returns {Deferred}
     */
    retrieveJob = (cid) => {
        const job = this.observers.get(cid);

        this.observers.delete(cid);

        return job;
    };

    /**
     * Retrieve data by cid
     * @param {*} cid
     * @returns {*}
     */
    retrieveData = (cid) => {
        const data = this.queue.get(cid);

        this.queue.delete(cid);

        return data;
    };

    /**
     * Turn off WS
     */
    sleep = () => {
        this.isSleep = true;
        this.emit('sleep');

        //reject all queued jobs
        for (const job of this.observers.values()) {
            if (!job.fired) job.reject(ErrorCodes.E_WS_SLEEP);
        }

        //cleanup queue and observers, cid
        this.queue.clear();
        this.observers.clear();
        this.cid = 0;

        this.destroy();
    };

    /**
     * Turn on WS
     */
    wakeup = () => {
        this.isSleep = false;
        this.emit('wakeup');

        this.connect();
    };

    /**
     * Establish new WS connection
     */
    connect = () => {
        const uri = this.composeUrl();

        this.ws = new WebSocket(uri);
        this.ws.addEventListener('open', this.onOpen);
        this.ws.addEventListener('error', this.onError);
        this.ws.addEventListener('close', this.onClose);
        this.ws.addEventListener('message', this.onMessage);
    };

    /**
     * Destroy current WS connection
     */
    destroy = () => {
        if (this.ws) this.ws.close();
    };

    /**
     * Compose URL
     * @returns {string}
     */
    composeUrl = () => {
        const urlObj = url.parse(this.config.url, true),
            query = {
                ...urlObj.query,
                cid: this.cid
            };

        return url.format({
            ...urlObj,
            search: undefined,
            query
        });
    };

    /**
     * Open event handler
     */
    onOpen = () => {
        this.isConnected = true;
        this.last = moment();

        this.emit('open');
    };

    /**
     * Error event handler
     * @param {Error} e
     */
    onError = (e) => {
        console.log('WS error:', e);
    };

    /**
     * Close event handler
     */
    onClose = () => {
        this.isConnected = false;

        this.ws.removeEventListener('open', this.onOpen);
        this.ws.removeEventListener('error', this.onError);
        this.ws.removeEventListener('close', this.onClose);
        this.ws.removeEventListener('message', this.onMessage);
        this.ws = null;

        this.emit('close');

        if (!this.isSleep) this.connect();
    };

    /**
     * Message event handler
     * @param {*} message
     */
    onMessage = (message) => {
        try {
            const data = JSON.parse((message && message.data) || '{}') || {};

            if (!this.isSleep) {
                this.last = moment();

                if (data.action === 'ping') {
                    this.send({action: 'pong'});
                }
                else {
                    const {cid, action} = data || {};

                    this.emit('message', data);
                    if (cid) this.emit(`_:${cid}`, data);
                    if (action) this.emit(action, data);
                }
            }
        }
        catch (e) {
            console.log('Message handle error:', e);
        }
    };

    /**
     * Direct send message
     * @param {*} data
     */
    send = (data) => {
        if (this.isConnected) {
            const message = JSON.stringify(data);

            this.ws.send(message);
            this.emit('send', data);
        }
        else throw new Error(ErrorCodes.E_WS_UNESTABLISHED);
    };

    /**
     * Send notification w/o observing response
     * @param {Object} data
     * @returns {Promise}
     */
    notify(data) {
        return new Promise((resolve, reject) => {
            if (!this.isSleep) {
                const cid = ++this.cid,
                    job = new Deferred(this.config.responseTimeout);

                job.promise
                    .then(resolve)
                    .catch(reject);

                this.observers.set(cid, job);
                this.queue.set(cid, {
                    ...data || {},
                    cid
                });
            }
            else reject(ErrorCodes.E_WS_SLEEP);
        });
    }

    /**
     * Send request with observing response
     * @param {Object} data
     * @returns {Promise}
     */
    request(data) {
        return new Promise((resolve, reject) => {
            if (!this.isSleep) {
                const cid = ++this.cid,
                    job = new Deferred(this.config.responseTimeout);

                this.once(`_:${cid}`, (response) => {
                    job.promise
                        .then(() => {
                            resolve(response);
                        })
                        .catch((e) => {
                            this.removeAllListeners(`_:${cid}`);
                            reject(e);
                        });
                });

                this.observers.set(cid, job);
                this.queue.set(cid, {
                    ...data || {},
                    cid
                });
            }
            else reject(ErrorCodes.E_WS_SLEEP);
        });
    }
}
