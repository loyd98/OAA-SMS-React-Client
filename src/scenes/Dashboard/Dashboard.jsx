import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';
const axios = require('axios');

import SearchBar from '../../components/SearchBar/SearchBar';
import TableContainer from '../../components/TableContainer/TableContainer';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      data,
      currentTable,
      handlePagination,
      handleDelete,
      username,
      setViewedData,
      setShowAdd,
      setEditForm,
      setCurrentId,
      searchQuery,
      handleSearch,
    } = this.props;

    return (
      <div className="dashboard flex--vertical">
        <SearchBar
          username={username}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        <TableContainer
          data={data}
          currentTable={currentTable}
          handlePagination={handlePagination}
          handleDelete={handleDelete}
          setViewedData={setViewedData}
          setShowAdd={setShowAdd}
          setEditForm={setEditForm}
          setCurrentId={setCurrentId}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
