import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'core/common';

class AuthContainer extends React.Component {
    static propTypes = {
        isLogged: PropTypes.bool.isRequired,
        children: PropTypes.element.isRequired,
        login: PropTypes.element.isRequired
    };

    static mapStateToProps = (state) => {
        return state.auth;
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {isLogged, children, login} = this.props;

        return isLogged ? children : login;
    }
}

export default connect(AuthContainer);
