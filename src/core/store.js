import createHistory from 'history/createBrowserHistory';
import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {isProduction} from 'core/common';
import DevTools from 'core/devtools';

const history = createHistory(),
    historyMiddleware = routerMiddleware(history),
    sagaMiddleware = createSagaMiddleware(),

    /**
     * Configure store
     * @param {Array.<Function>} middleware
     * @param {*} rootReducer
     * @param {*} initialState
     * @returns {*}
     */
    configureStore = (middleware = [], rootReducer = () => {}, initialState = {}) => {
        const appliedMiddleware = applyMiddleware(historyMiddleware, sagaMiddleware, thunk, ...middleware);

        return createStore(
            rootReducer,
            initialState,
            isProduction() ? appliedMiddleware : compose(appliedMiddleware, DevTools.instrument())
        );
    };

export {
    history,
    configureStore
};

