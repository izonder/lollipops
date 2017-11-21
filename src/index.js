/* eslint-disable global-require */
/**
 * TODO: IMPORTANT!
 * Don't use async arrow with react-hot-loader, be aware of this:
 * https://github.com/gaearon/react-hot-loader/issues/391
 */
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
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
            <AppContainer>
                <App store={store} history={history} component={IndexLayout} />
            </AppContainer>,
            document.getElementById('root')
        );

        //hot-module-replacement
        if (module.hot) {
            module.hot.accept('reducers/index', () => initialize(store));
            module.hot.accept('layouts/index', () => initialize(store));
        }
    };

initialize(configureStore(middleware));
