import './style.scss';

import React from 'react';
import {Link} from 'react-router-dom';

import logo from 'assets/favicon.png';

import LogoutContainer from 'containers/logout';

/**
 * Main page layout
 * @returns {XML}
 */

export default function MainLayout() {
    return (
        <div className="container">
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">
                    <img src={logo} width="30" height="30" />
                </span>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/somewhere" className="nav-link">Somewhere</Link>
                    </li>
                </ul>
                <form className="form-inline">
                    <LogoutContainer />
                </form>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="jumbotron">
                        <h1 className="display-3">Welcome lollipops world!</h1>
                        <p className="lead">Easy and clear React/Redux/Docker boilerplate</p>
                        <a className="btn btn-lollipops" href="https://github.com/izonder/lollipops">Read more</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
