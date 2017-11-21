import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class Logout extends React.Component {
    static propTypes = {
        onLogout: PropTypes.func.isRequired
    };

    render() {
        const {onLogout} = this.props;

        return (
            <button className="btn btn-outline-lollipops" onClick={onLogout}>Logout</button>
        );
    }
}
