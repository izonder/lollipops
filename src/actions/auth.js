export const
    /**
     * Actions dictionary
     * @type {string}
     */
    A_AUTH_SUCCESS = 'A_AUTH_SUCCESS',
    A_AUTH_FAIL = 'A_AUTH_FAIL',
    A_AUTH_SUBMIT = 'A_AUTH_SUBMIT',
    A_AUTH_LOGOUT = 'A_AUTH_LOGOUT',

    /**
     * Success action
     * @param {boolean} payload
     * @returns {{type, payload, error}}
     */
    authSuccessAction = (payload) => {
        return {
            type: A_AUTH_SUCCESS,
            payload
        };
    },

    /**
     * Fail action
     * @param {Error} error
     * @returns {{type, payload, error}}
     */
    authFailAction = (error) => {
        return {
            type: A_AUTH_FAIL,
            error
        };
    },

    /**
     * Submit action
     * @param {*} payload
     * @returns {{type, payload, error}}
     */
    authSubmitAction = (payload) => {
        return {
            type: A_AUTH_SUBMIT,
            payload
        };
    },

    /**
     * Logout/reset action
     * @returns {{type, payload, error}}
     */
    authLogoutAction = () => {
        return {
            type: A_AUTH_LOGOUT
        };
    };
