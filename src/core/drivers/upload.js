import {EventEmitter} from 'events';

const STATE_READY = 4,
    HTTP_OK = 200,
    TIMEOUT_DEFAULT = 10000,
    ErrorsCodes = {
        E_UPLOAD_TIMEOUT: 'E_UPLOAD_TIMEOUT',
        E_UPLOAD_REQUEST_ERROR: 'E_UPLOAD_REQUEST_ERROR',
        E_UPLOAD_REQUEST_FAILED: 'E_UPLOAD_REQUEST_FAILED'
    };

class UploadItem extends EventEmitter {
    constructor(config, payload) {
        super();

        this.config = config;

        this.promise = this.process(payload);
        this.result = null;
        this.progress = 0;
    }

    getResult() {
        return this.result;
    }

    getProgress() {
        return this.progress;
    }

    getWorker() {
        return this.promise;
    }

    process(payload) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest(),
                url = this.config.url;

            xhr.open('POST', url, true);
            xhr.responseType = 'json';
            xhr.timeout = this.config.timeout || TIMEOUT_DEFAULT;

            xhr.ontimeout = () => reject(new Error(ErrorsCodes.E_UPLOAD_TIMEOUT));
            xhr.onerror = () => reject(new Error(ErrorsCodes.E_UPLOAD_REQUEST_ERROR));
            xhr.onload = () => {
                if (xhr.readyState === STATE_READY) {
                    if (xhr.status === HTTP_OK) {
                        this.result = xhr.response;
                        resolve(xhr.response);
                    }
                    else {
                        reject(new Error(ErrorsCodes.E_UPLOAD_REQUEST_FAILED));
                    }
                }
            };

            xhr.upload.addEventListener('progress', (e) => {
                const progress = Math.ceil(e.loaded / e.total * 100);

                this.progress = progress;
                this.emit('progress', progress);
            });

            xhr.send(payload);
        });
    }
}

export default class UploadDriver {
    constructor(config) {
        this.config = config;
    }

    /**
     * Fetch data
     * @param {FormData} payload
     * @returns {UploadItem}
     */
    upload(payload) {
        return new UploadItem(this.config, payload);
    }
}
