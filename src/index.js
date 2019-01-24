/* eslint-disable global-require */
import React from 'react';
import {render} from 'react-dom';
import {history} from 'core/history';
import {createReducer} from 'core/reducer';
import {createStore} from 'core/store';
import {App} from 'core/app';
import middleware from 'middleware';
import reducers from 'reducers';

const
    reducer = createReducer(history),
    store = createStore(history),

    /**
     * Initialize function
     * @param {*} storeInstance
     * @param {boolean} replaceReducers
     */
    initialize = async (storeInstance, replaceReducers = false) => {
        const {default: IndexLayout} = await import('layouts/index');

        //replace reducers
        if (replaceReducers) {
            const {default: newReducers} = await import('reducers');
            storeInstance.replaceReducer(reducer(newReducers));
        }

        //render app
        render(
            <App store={storeInstance} history={history} component={IndexLayout} />,
            document.getElementById('root')
        );

        //hot-module-replacement
        if (module.hot) {
            module.hot.accept('reducers/index', () => initialize(storeInstance, true));
            module.hot.accept('layouts/index', () => initialize(storeInstance, true));
        }
    };

initialize(store(middleware, reducer(reducers)));
