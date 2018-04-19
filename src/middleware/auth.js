import ObserverFactory from 'core/observer';
import Container from 'core/container';
import {A_APPLICATION_READY} from 'core/app';
import {
    A_AUTH_SUBMIT,
    authSuccessAction,
    authLogoutAction,
    authFailAction
} from 'actions/auth';

export class AuthMiddleware extends ObserverFactory {
    config = {};
    api = null;

    constructor() {
        super();

        this.on(A_APPLICATION_READY, this.init);
        this.on(A_AUTH_SUBMIT, this.login);
    }

    init = () => {
        this.config = ((Container.get('config') || {}).modules || {}).auth;
        this.api = Container.get('driver/auth');
    };

    login = async ({action, dispatch}) => {
        const {username, password} = action.payload || {};

        try {
            //todo: use API driver
            if (username === 'test' && password === 'test') {
                dispatch(authSuccessAction(true));
            }
            else throw new Error('credentials failed');
        }
        catch (e) {
            this.handleError(dispatch, e);
        }
    };

    handleError = (dispatch, e) => {
        dispatch(authFailAction(e));
        dispatch(authLogoutAction());
    }
}

export default (new AuthMiddleware()).produceMiddleware();
