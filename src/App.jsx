import React, { Component, Fragment } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import View from './scenes/View/View';

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

  componentDidMount() {
    const temp = localStorage.getItem('data');
    const loadedData = JSON.parse(temp);
    const username = sessionStorage.getItem('username');
    if (loadedData) {
      this.setState({ data: loadedData });
    }

    if (username) {
      this.setState({ username });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, username } = this.state;

    if (prevState.data !== data) {
      const temp = JSON.stringify(data);
      localStorage.setItem('data', temp);
    }

    if (prevState.username !== username) {
      sessionStorage.setItem('username', username);
    }
  }

  loginUser = async (credentials) => {
    try {
      const resp = await axios.post(`${this.url}/login`, credentials);
      return resp;
    } catch (err) {
      console.error(err);
    }

    return null;
  };

  setUsername = (username) => this.setState({ username });

  setPassword = (password) => this.setState({ password });

  handleSubmit = async (e) => {
    const { username, password } = this.state;

    e.preventDefault();
    const token = await this.loginUser({
      username,
      password,
    });

    if (token) {
      sessionStorage.setItem('token', token.data);
      try {
        const data = await axios.get(`${this.url}/donors/asc`, {
          headers: { Authorization: `Bearer ${token.data}` },
        });

        this.setState({ data: data.data });
        return true;
      } catch (err) {
        console.log(err);
      }
    }

    return false;
  };

  render() {
    const { data, username, password, redirect, currentTable } = this.state;

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
                      username={username}
                      currentTable={currentTable}
                      handlePagination={this.handlePagination}
                    />
                  </>
                </>
              )}
            />
            <Route
              exact
              path-="view/1?id=:id"
              render={(props) => <View {...props} data={data} />}
            ></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
