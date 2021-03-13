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
      username,
      setViewedData,
      setShowAdd,
    } = this.props;

    return (
      <div className="dashboard flex--vertical">
        <SearchBar username={username} />
        <TableContainer
          data={data}
          currentTable={currentTable}
          handlePagination={handlePagination}
          setViewedData={setViewedData}
          setShowAdd={setShowAdd}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
