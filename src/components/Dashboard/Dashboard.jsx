import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';
const axios = require('axios');

import SearchBar from '../SearchBar/SearchBar';
import TableContainer from '../TableContainer/TableContainer';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { data, currentTable, handlePagination } = this.props;

    return (
      <div className="dashboard flex--vertical">
        <SearchBar />
        <TableContainer
          data={data}
          currentTable={currentTable}
          handlePagination={handlePagination}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
