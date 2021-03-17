import React, { Component, Fragment } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';

// Components
import Navigation from './components/Navigation/Navigation';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import View from './scenes/View/View';
import Modal from './components/Modal/Modal';
import Add from './scenes/Add/Add';

const axios = require('axios');
const config = require('./data.config');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      currentTable: [],
      username: '',
      password: '',
      config,
    };
    this.url = config.URL;
  }

  handleUsername = (username) => this.setState({ username });
  handlePassword = (password) => this.setState({ password });
  handleCurrentTable = (currentTable) => this.setState({ currentTable });
  handleCurrentData = (currentData) => this.setState({ currentData });

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <HashRouter>
          {/* {showAdd && <Add />} */}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  url={this.url}
                  username={username}
                  password={password}
                  handleCurrentData={this.handleCurrentData}
                  handleCurrentTable={this.handleCurrentTable}
                  handleUsername={this.handleUsername}
                  handlePassword={this.handlePassword}
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
                    <Dashboard />
                  </>
                </>
              )}
            />
            <Route exact path-="view/1?id=:id" render={(props) => <View />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
