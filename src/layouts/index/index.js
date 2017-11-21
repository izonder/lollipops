import 'assets/scss/common.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';

import AuthContainer from 'containers/auth';
import MainLayout from 'layouts/main';
import LoginLayout from 'layouts/login';
import NotFoundLayout from 'layouts/not-found';

/**
 * Default layout (entry point)
 * @returns {XML}
 */
export default function IndexLayout() {
    return (
        <Switch>
            <Route exact path="/login" component={LoginLayout} />
            <Route render={(props) => (
                <AuthContainer login={<Redirect to={{pathname: '/login', state: {referrer: props.location}}} />}>
                    <Switch>
                        <Route exact path="/" component={MainLayout} />
                        <Route component={NotFoundLayout} />
                    </Switch>
                </AuthContainer>
            )}
            />
        </Switch>
    );
}

IndexLayout.propTypes = {
    location: PropTypes.object.isRequired
};
