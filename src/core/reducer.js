import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export const
    /**
     * Reducers factory
     * @param {Object} history
     * @returns {Function}
     */
    createReducer = (history) => {
        /**
         * Combine (mixin) routing reducer
         * @param {Object} reducers
         * @returns {Function}
         */
        return (reducers) => {
            return combineReducers({
                ...reducers,
                router: connectRouter(history)
            });
        };
    };
