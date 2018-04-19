/* eslint-disable global-require */
import React from 'react';
import {render} from 'react-dom';
import {createReducer} from 'core/reducer';
import {configureStore, history} from 'core/store';
import {App} from 'core/app';
import middleware from 'middleware';

const
    /**
     * Initialize function
     * @param {*} store
     */
    initialize = (store) => {
        const reducers = require('reducers/index').default,
            IndexLayout = require('layouts/index/index').default;

        //replace reducers
        store.replaceReducer(createReducer(reducers));

        //render app
        render(
            <App store={store} history={history} component={IndexLayout} />,
            document.getElementById('root')
        );

        //hot-module-replacement
        if (module.hot) {
            module.hot.accept('reducers/index', () => initialize(store));
            module.hot.accept('layouts/index', () => initialize(store));
        }
    };

initialize(configureStore(middleware));
