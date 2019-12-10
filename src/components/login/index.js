import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    initState = {
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);

        this.state = this.initState;
    }

    handleChange = (e, property) => {
        this.setState({
            [property]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        return this.state.username && this.state.password && this.props.onSubmit(this.state);
    };

    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <h1 className="display-4">Authorization</h1>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={(e) => this.handleChange(e, 'username')}
                    />
                    <small className="form-text text-muted">Enter &quot;test&quot;</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e, 'password')}
                    />
                    <small className="form-text text-muted">Enter &quot;test&quot;</small>
                </div>
                <button className="btn btn-outline-lollipops" type="submit">Enter</button>
            </form>
        );
    }
}
