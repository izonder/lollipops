import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'core/common';

import Logout from 'components/logout';
import {authLogoutAction} from 'actions/auth';

class LogoutContainer extends React.Component {
    static propTypes = {
        onLogout: PropTypes.func.isRequired
    };

    static mapStateToProps = (state) => {
        return {
            ...state.auth
        };
    };

    static mapDispatchToProps = (dispatch) => {
        return {
            onLogout: () => dispatch(authLogoutAction())
        };
    };

    render() {
        return <Logout {...this.props} />;
    }
}

export default connect(LogoutContainer);
