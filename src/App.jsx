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
      dataInView: [],
      username: '',
      password: '',
      currentTable: sessionStorage.getItem('currentTable'),
      viewedData: {},
      showAdd: false,
      currentId: sessionStorage.getItem('currentId'),
      addForm: {},
      editForm: {},
      config: config,
      searchQuery: '',
      searchTimeout: 0,
    };
    this.url = config.URL;
  }

  componentWillMount() {
    console.log('hit');
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

    const currentId = sessionStorage.getItem('currentId');
    if (currentId) {
      this.setState({ currentId });
    }

    const editForm = JSON.parse(sessionStorage.getItem('editForm'));
    if (editForm) {
      this.setState({ editForm });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      data,
      username,
      currentTable,
      viewedData,
      config,
      currentId,
      editForm,
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

    if (prevState.currentId !== currentId) {
      sessionStorage.setItem('currentId', currentId);
    }

    if (prevProps.editForm !== editForm) {
      const temp = JSON.stringify(editForm);
      sessionStorage.setItem('editForm', temp);
    }
  }

  handleRead = async (path) => {
    const token = sessionStorage.getItem('token');

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (token) {
      try {
        const res = await axios.get(`${this.url}${path}`, options);
        this.setState({ data: res.data });
      } catch {
        (err) => console.log(err);
      }
    }

    return [];
  };

  // fetchData = async (token) => {
  //   const { currentTable } = this.state;
  //   const options = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   if (token) {
  //     if (currentTable === 'donors') {
  //       try {
  //         const res = await axios.get(`${this.url}/donor/asc`, options);
  //         this.setState({ data: res.data });
  //       } catch {
  //         (err) => console.log(err);
  //       }
  //     } else if (currentTable === 'donations') {
  //       try {
  //         const res = await axios.get(`${this.url}/donation/asc`, options);
  //         this.setState({ data: res.data });
  //       } catch {
  //         (err) => console.log(err);
  //       }
  //     }
  //   }

  //   return [];
  // };

  // requestDataInView = async (path) => {
  //   const token = sessionStorage.getItem('token');

  //   const options = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   if (token) {
  //     try {
  //       const res = await axios.get(`${this.url}${path}`, options);
  //       this.setState({ dataInView: res.data });
  //     } catch {
  //       (err) => console.log(err);
  //     }
  //   }

  //   return [];
  // };

  setUsername = (username) => this.setState({ username });

  setPassword = (password) => this.setState({ password });

  setViewedData = (viewedData) => this.setState({ viewedData });

  setShowAdd = (showAdd) => this.setState({ showAdd });

  setEditForm = (editForm) => this.setState({ editForm });

  setConfig = (config) => this.setState({ config });

  setCurrentId = (currentId) => this.setState({ currentId });

  setCurrentTable = (currentTable) => this.setState({ currentTable });

  setData = (data) => this.setState({ data });

  setDataInView = (dataInView) => this.setState({ dataInView });

  setEditFormField = (field, value) => {
    this.setState((prevState) => ({
      editForm: { ...prevState.editForm, [field]: value },
    }));
  };

  setAddFormField = (field, value) => {
    this.setState((prevState) => ({
      addForm: {
        ...prevState.addForm,
        [field]: value,
      },
    }));
  };

  handleAddFormSubmit = async () => {
    const { addForm, currentTable } = this.state;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (currentTable === 'donors') {
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
    } else if (currentTable === 'donations') {
      axios.post(`${this.url}/donation/add`, addForm, options).then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          this.fetchData(token);
        } else {
          //TODO
        }
      });
    }
  };

  handleEditFormSubmit = (e) => {
    e.preventDefault();
    const { editForm } = this.state;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .patch(`${this.url}/donor/update`, editForm, options)
      .then((res) => {
        localStorage.clear();
        this.setState({ viewedData: res.data });
        this.fetchData(token);
      })
      .catch((err) => console.log(err));
  };

  handleDelete = (e) => {
    const { currentTable } = this.state;
    const token = sessionStorage.getItem('token');
    const id = e.target.dataset.id + '';

    if (currentTable === 'donors') {
      axios
        .delete(`${this.url}/donor/delete/id`, {
          data: id,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // this.setState({ viewedData: res.data });
          this.fetchData(token);
        })
        .catch((err) => console.log(err.response));
    } else if (currentTable === 'donations') {
      axios
        .delete(`${this.url}/donation/delete/id`, {
          data: id,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // this.setState({ viewedData: res.data });
          this.fetchData(token);
        })
        .catch((err) => console.log(err.response));
    }
  };

  handleSearch = (keyword) => {
    const token = sessionStorage.getItem('token');
    const { searchTimeout } = this.state;
    const options = {
      headers: { Authorization: `Bearer ${token}` },
      params: { keyword: keyword !== '' ? keyword : null },
    };

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    this.setState({
      searchTimeout: setTimeout(() => {
        axios
          .get(`${this.url}/donor/search`, options)
          .then((res) => {
            this.setState({ data: res.data });
          })
          .catch((err) => console.log(err));
      }, 500),
    });
  };

  handleTabClick = (e) => {
    const id = e.currentTarget.dataset.id.toLowerCase();
    const token = sessionStorage.getItem('token');

    this.setState({ currentTable: id });

    if (id === 'donations') {
      axios
        .get(`${this.url}/donation/asc`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => this.setState({ data: res.data }))
        .catch((err) => console.log(err));
    } else if (id === 'donors') {
      axios
        .get(`${this.url}/donor/asc`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => this.setState({ data: res.data }))
        .catch((err) => console.log(err));
    }
  };

  render() {
    const {
      data,
      dataInView,
      username,
      password,
      redirect,
      currentTable,
      viewedData,
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
                      setShowAdd={this.setShowAdd}
                      setCurrentId={this.setCurrentId}
                      searchQuery={this.searchQuery}
                      handleSearch={this.handleSearch}
                      setCurrentTable={this.setCurrentTable}
                      config={config}
                      handleRead={this.handleRead}
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
                  editForm={editForm}
                  setEditFormField={this.setEditFormField}
                  config={config}
                  handleEditFormSubmit={this.handleEditFormSubmit}
                  setViewedData={this.setViewedData}
                  setConfig={this.setConfig}
                  setEditForm={this.setEditForm}
                  setShowAdd={this.setShowAdd}
                  dataInView={dataInView}
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
