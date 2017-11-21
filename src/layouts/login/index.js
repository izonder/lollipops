import './style.scss';

import React from 'react';
import LoginContainer from 'containers/login';

/**
 * Login page layout
 * @returns {XML}
 */
export default function LoginLayout() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <LoginContainer />
                </div>
            </div>
        </div>
    );
}
