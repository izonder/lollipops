import React from 'react';
import {Link} from 'react-router-dom';

/**
 * 404 page layout
 * @returns {XML}
 */
export default function NotFoundLayout() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <h1 className="display-3">404</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Link to="/">Home page</Link>
                </div>
            </div>
        </div>
    );
}
