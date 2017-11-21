const STATE_READY = 4,
    HTTP_OK = 200,
    TIMEOUT_DEFAULT = 10000,
    ErrorsCodes = {
        E_REST_TIMEOUT: 'E_REST_TIMEOUT',
        E_REST_REQUEST_ERROR: 'E_REST_REQUEST_ERROR',
        E_REST_REQUEST_FAILED: 'E_REST_REQUEST_FAILED'
    };

export default class RestDriver {
    constructor(config) {
        this.config = config;
    }

    /**
     * Fetch data
     * @param {{path: string, method: string, payload: *}} args
     * @returns {Promise}
     */
    fetch({path = '', method = 'GET', payload}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest(),
                url = [this.config.url, path].join('');

            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.responseType = 'json';
            xhr.withCredentials = true;
            xhr.timeout = this.config.timeout || TIMEOUT_DEFAULT;

            xhr.ontimeout = () => reject(new Error(ErrorsCodes.E_REST_TIMEOUT));
            xhr.onerror = () => reject(new Error(ErrorsCodes.E_REST_REQUEST_ERROR));
            xhr.onload = () => {
                if (xhr.readyState === STATE_READY) {
                    if (xhr.status === HTTP_OK) {
                        resolve(xhr.response);
                    }
                    else {
                        reject(new Error(ErrorsCodes.E_REST_REQUEST_FAILED));
                    }
                }
            };

            xhr.send(this.serialize(payload));
        });
    }

    serialize(payload) {
        return Object.keys(payload || {})
            .map((key) => {
                return `${key}=${encodeURIComponent(payload[key])}`;
            })
            .join('&');
    }
}
