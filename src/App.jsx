import React, { Component, Fragment } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: '',
      password: '',
      redirect: null,
      currentTable: 'Donors',
    };
    this.url = 'http://localhost:8080';
  }

  render() {
    const {
      data,
      username,
      password,
      redirect,
      currentTable,
      pageDetails,
    } = this.state;

    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  redirect={redirect}
                  username={username}
                  password={password}
                  setUsername={this.setUsername}
                  setPassword={this.setPassword}
                  handleSubmit={this.handleSubmit}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={() => (
                <>
                  <>
                    <Navigation />
                    <Dashboard
                      data={data}
                      currentTable={currentTable}
                      handlePagination={this.handlePagination}
                    />
                  </>
                </>
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const temp = JSON.stringify(this.state.data);
      localStorage.setItem('data', temp);
    }
  }

  componentDidMount() {
    const temp = localStorage.getItem('data');
    const loadedData = JSON.parse(temp);
    if (loadedData) {
      this.setState({ data: loadedData });
    }
  }

  loginUser = async (credentials) => {
    try {
      const resp = await axios.post(`${this.url}/login`, credentials);
      return resp;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  setUsername = (user) => this.setState({ username: user });
  setPassword = (password) => this.setState({ password: password });
  handlePagination = (pageDetails) => {
    console.log('hit');
    this.setState({ pageDetails });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = await this.loginUser({
      username: this.state.username,
      password: this.state.password,
    });

    if (token) {
      sessionStorage.setItem('token', token.data);
      try {
        const data = await axios.get(`${this.url}/donors/asc`, {
          headers: { Authorization: `Bearer ${token.data}` },
        });

        this.setState({ data: data.data });
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export default App;
