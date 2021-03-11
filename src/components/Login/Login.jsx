import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Login.scoped.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.nameAutoFocus = true;
  }

  componentDidMount() {
    this.nameAutoFocus = false;
  }

  render() {
    const {
      username,
      password,
      setUsername,
      setPassword,
      handleSubmit,
    } = this.props;

    if (sessionStorage.getItem('token')) {
      return <Redirect to="dashboard" />;
    }

    return (
      <div className="login">
        <div className="login__container">
          <h1 className="blue">Log-in</h1>
          <form id="login__form">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id="login__proceed--btn" onClick={handleSubmit}>
              Proceed
            </button>
            <div className="red flex-vertical hidden" id="login__error">
              Invalid username or password.
            </div>
            <a className="blue" id="createNewUserbtn">
              Create new User
            </a>
            <a className="blue">Forgot Password?</a>
          </form>
        </div>
      </div>
    );
  }
}
