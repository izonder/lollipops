import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

export const
    /**
     * Combine (mixin) routing reducer
     * @param {Object} reducers
     * @returns {Function}
     */
    createReducer = (reducers) => {
        return combineReducers({
            ...reducers,
            routing
        });
    };
