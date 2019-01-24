import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

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
class AppComponent extends React.Component {
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
                <ConnectedRouter history={history}>
                    <div id="wrapper">
                        <Route path="/" component={component} />
                        {enableDevTool() ? <DevTools /> : ''}
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

const App = hot(module)(AppComponent); //eslint-disable-line one-var

export {
    App,
    A_APPLICATION_INIT,
    A_APPLICATION_READY
};
