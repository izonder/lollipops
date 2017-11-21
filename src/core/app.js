import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import {enableDevTool} from 'core/common';
import DevTools from 'core/devtools';
import Config from 'core/config';
import Container from 'core/container';
import initializeDriver from 'core/drivers';

const
    /**
     * Ready action
     * @type {string}
     */
    A_APPLICATION_INIT = '@@application/INIT',
    A_APPLICATION_MOUNT = '@@application/MOUNT',
    A_APPLICATION_READY = '@@application/READY';

/**
 * Application core
 * TODO: add ability to specify root path instead of hardcoded "/"
 */
class App extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        component: PropTypes.any.isRequired
    };

    constructor(...args) {
        super(...args);

        Container.set('config', Config);
        Container.set('store', this.props.store);

        this.dispatch(A_APPLICATION_INIT);
        this.initialize()
            .then(() => this.dispatch(A_APPLICATION_READY));
    }

    componentDidMount() {
        this.dispatch(A_APPLICATION_MOUNT);
    }

    /**
     * Init dependencies
     * @returns {Promise}
     */
    initialize() {
        const initializer = [],
            {drivers} = Config || {};

        for (const name in drivers || {}) {
            if (drivers.hasOwnProperty(name) && drivers[name] && drivers[name].enabled) {
                initializer.push(initializeDriver(name, drivers[name]));
            }
        }

        return Promise.all(initializer);
    }

    /**
     * Dispatch actions
     * @param {string} type
     */
    dispatch(type) {
        this.props.store.dispatch({type});
    }

    render() {
        const {store, history, component} = this.props;

        return (
            <Provider store={store}>
                <div id="wrapper">
                    <ConnectedRouter history={history}>
                        <Route path="/" component={component}/>
                    </ConnectedRouter>
                    {enableDevTool() ? <DevTools /> : ''}
                </div>
            </Provider>
        );
    }
}

export {
    App,
    A_APPLICATION_INIT,
    A_APPLICATION_READY
};
