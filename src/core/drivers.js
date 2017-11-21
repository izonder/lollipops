import Container from 'core/container';
import RestDriver from 'core/drivers/rest';
import UploadDriver from 'core/drivers/upload';
import WsDriver from 'core/drivers/ws';

const drivers = new Map([
    ['rest', RestDriver],
    ['upload', UploadDriver],
    ['ws', WsDriver]
]);

/**
 * Initialize driver
 * @param {string} name
 * @param {*} options
 * @returns {Promise}
 */
export default (name, options) => {
    const {driver, config} = options || {},
        Component = drivers.get(driver);

    if (Component && typeof Component === 'function') {
        const instance = new Component(config || {});

        //inject essential methods
        if (!instance.init) instance.init = () => Promise.resolve();
        if (!instance.getInstance) instance.getInstance = () => instance;

        return instance.init()
            .then(() => Container.set(`driver/${name}`, instance.getInstance()));
    }
    else throw new Error(`[Core] driver not found [${driver}]`);
};
