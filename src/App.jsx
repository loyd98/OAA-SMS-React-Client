import React, { Component, Fragment } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import View from './scenes/View/View';
import Modal from './components/Modal/Modal';

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: '',
      password: '',
      redirect: null,
      currentTable: '',
      viewedData: {},
      showModal: false,
    };
    this.url = 'http://localhost:8080';
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.setState({ data });
    }

    const username = sessionStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }

    const currentTable = sessionStorage.getItem('currentTable');
    if (currentTable) {
      this.setState({ currentTable });
    }

    const viewedData = JSON.parse(sessionStorage.getItem('viewedData'));
    if (viewedData) {
      this.setState({ viewedData });
    }

    const showModal = sessionStorage.getItem('showModal');
    if (showModal) {
      this.setState({ showModal });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, username, currentTable, viewedData, showModal } = this.state;

    if (prevState.data !== data) {
      const temp = JSON.stringify(data);
      localStorage.setItem('data', temp);
    }

    if (prevState.username !== username) {
      sessionStorage.setItem('username', username);
    }

    if (prevState.currentTable !== currentTable) {
      sessionStorage.setItem('currentTable', currentTable);
    }

    if (prevState.viewedData !== viewedData) {
      const temp = JSON.stringify(viewedData);
      sessionStorage.setItem('viewedData', temp);
    }

    if (prevState.showModal !== showModal) {
      sessionStorage.setItem('showModal', showModal);
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

  setViewedData = (viewedData) => this.setState({ viewedData });

  setShowModal = (showModal) => this.setState({ showModal });

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

        this.setState({ data: data.data, currentTable: 'donors' });
        return true;
      } catch (err) {
        console.log(err);
      }
    }

    return false;
  };

  render() {
    const {
      data,
      username,
      password,
      redirect,
      currentTable,
      viewedData,
      showModal,
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
                      username={username}
                      currentTable={currentTable}
                      handlePagination={this.handlePagination}
                      setViewedData={this.setViewedData}
                    />
                  </>
                </>
              )}
            />
            <Route
              exact
              path-="view/1?id=:id"
              render={(props) => (
                <View
                  {...props}
                  data={data}
                  currentTable={currentTable}
                  viewedData={viewedData}
                  showModal={showModal}
                  setShowModal={this.setShowModal}
                />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
