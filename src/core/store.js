import {applyMiddleware, createStore as store, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {isProduction} from 'core/common';
import DevTools from 'core/devtools';

export const
    /**
     * Store factory
     * @param {*} history
     * @returns {*}
     */
    createStore = (history) => {
        /**
         * Configure store
         * @param {Array.<Function>} middleware
         * @param {*} rootReducer
         * @param {*} initialState
         * @returns {*}
         */
        return (middleware = [], rootReducer = () => {}, initialState = {}) => {
            const historyMiddleware = routerMiddleware(history),
                sagaMiddleware = createSagaMiddleware(),
                appliedMiddleware = applyMiddleware(historyMiddleware, sagaMiddleware, thunk, ...middleware);

            return store(
                rootReducer,
                initialState,
                isProduction() ? appliedMiddleware : compose(appliedMiddleware, DevTools.instrument())
            );
        };
    };

