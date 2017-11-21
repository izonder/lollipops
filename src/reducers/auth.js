import ObserverFactory from 'core/observer';
import {
    A_AUTH_SUCCESS,
    A_AUTH_LOGOUT
} from 'actions/auth';

const initialState = {
    isLogged: false
};

class AuthReducer extends ObserverFactory {
    constructor() {
        super();

        this.on(A_AUTH_SUCCESS, this.handleSuccess);
        this.on(A_AUTH_LOGOUT, this.handleLogout);
    }

    handleSuccess = ({state, action}) => {
        const {payload} = action || {};

        return {
            ...state,
            isLogged: payload
        };
    };

    handleLogout = ({state}) => {
        return {
            ...state,
            ...initialState
        };
    };
}

export default (new AuthReducer()).produceReducer(initialState);
