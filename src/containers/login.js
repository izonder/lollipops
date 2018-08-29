import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'core/common';
import {Redirect} from 'react-router-dom';

import Login from 'components/login';
import {authSubmitAction} from 'actions/auth';

class LoginContainer extends React.Component {
    static propTypes = {
        isLogged: PropTypes.bool.isRequired,
        referrer: PropTypes.any.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static mapStateToProps = (state) => {
        return {
            ...state.auth,
            referrer: state.routing.location?.state?.referrer || '/'
        };
    };

    static mapDispatchToProps = (dispatch) => {
        return {
            onSubmit: (state) => dispatch(authSubmitAction(state))
        };
    };

    render() {
        const {isLogged, referrer} = this.props;

        return (
            isLogged ?
                <Redirect to={referrer} /> :
                <Login {...this.props} />
        );
    }
}

export default connect(LoginContainer);
