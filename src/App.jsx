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
      data: [],
      username: '',
      password: '',
      redirect: null,
      currentTable: sessionStorage.getItem('currentTable'),
      viewedData: {},
      showModal: false,
      showAdd: false,
      addForm: {},
      editForm: {},
      config: config,
    };
    this.url = 'http://localhost:8080';
  }

  componentDidMount() {
    sessionStorage.setItem('config', config);

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
      this.setState({ showModal: showModal === 'true' });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      data,
      username,
      currentTable,
      viewedData,
      showModal,
      config,
    } = this.state;

    if (prevState.data !== data) {
      const temp = JSON.stringify(data);
      localStorage.setItem('data', temp);
    }

    if (prevState.username !== username) {
      sessionStorage.setItem('username', username);
    }

    if (prevState.currentTable !== currentTable) {
      sessionStorage.setItem('currentTable', currentTable);

      const addForm = {};
      config.ordering[currentTable].map((key) => (addForm[key.key] = ''));
      this.setState({ addForm });

      const editForm = {};
      config.ordering[currentTable].map(
        (key) => editForm[key.key] == this.setState({ addForm }),
      );
    }

    if (prevState.viewedData !== viewedData) {
      const temp = JSON.stringify(viewedData);
      sessionStorage.setItem('viewedData', temp);
    }

    if (prevState.showModal !== showModal) {
      sessionStorage.setItem('showModal', showModal);
    }
  }

  fetchData = async (token) => {
    if (token) {
      sessionStorage.setItem('token', token);
      try {
        const data = await axios.get(`${this.url}/donor/asc`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.setState({ data: data.data });
        return true;
      } catch (err) {
        console.log(err);
      }
    }

    return false;
  };

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
        const data = await axios.get(`${this.url}/donor/asc`, {
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

  setUsername = (username) => this.setState({ username });

  setPassword = (password) => this.setState({ password });

  setViewedData = (viewedData) => this.setState({ viewedData });

  setShowModal = (showModal) => this.setState({ showModal });

  setShowAdd = (showAdd) => this.setState({ showAdd });

  setEditForm = (editForm) => this.setState({ editForm });

  setConfig = (config) => this.setState({ config });

  setEditFormField = (field, value) => {
    this.setState((prevState) => ({
      editForm: { ...prevState.editForm, [field]: value },
    }));
    console.log(this.state.editForm);
  };

  setAddFormField = (field, value) => {
    this.setState((prevState) => ({
      addForm: {
        ...prevState.addForm,
        [field]: value,
      },
    }));
  };

  loginUser = async (credentials) => {
    try {
      const resp = await axios.post(`${this.url}/login`, credentials);
      return resp;
    } catch (err) {
      console.error(err);
    }

    return null;
  };

  handleAddFormSubmit = () => {
    const { addForm } = this.state;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${this.url}/donor/add`, addForm, options)
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          this.fetchData(token);
        } else {
          //TODO
        }
      })
      .catch((err) => console.log(err));
  };

  handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { editForm } = this.state;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(token);
    axios
      .patch(`${this.url}/donor/update`, editForm, options)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleDelete = (e) => {
    const token = sessionStorage.getItem('token');

    const id = e.target.dataset.id + '';

    axios
      .delete(`${this.url}/donor/delete/id`, {
        data: id,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err.response));
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
      showAdd,
      config,
      editForm,
    } = this.state;

    return (
      <div className="App">
        <HashRouter>
          {showAdd && (
            <Add
              currentTable={currentTable}
              setShowAdd={this.setShowAdd}
              setAddFormField={this.setAddFormField}
              handleAddFormSubmit={this.handleAddFormSubmit}
              config={config}
            />
          )}
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
                      handleDelete={this.handleDelete}
                      setViewedData={this.setViewedData}
                      setShowAdd={this.setShowAdd}
                      setEditForm={this.setEditForm}
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
                  editForm={editForm}
                  setShowModal={this.setShowModal}
                  setEditFormField={this.setEditFormField}
                  config={config}
                  handleEditFormSubmit={this.handleEditFormSubmit}
                  setViewedData={this.setViewedData}
                  setConfig={this.setConfig}
                  setEditForm={this.setEditForm}
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
