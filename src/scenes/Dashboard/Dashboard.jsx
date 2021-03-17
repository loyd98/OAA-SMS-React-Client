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
      config,
      currentTable,
      currentData,
      handleRead,
      handleCurrentData,
    } = this.props;

    return (
      <div className="dashboard flex--vertical">
        <SearchBar />
        <TableContainer
          config={config}
          currentData={currentData}
          currentTable={currentTable}
          handleRead={handleRead}
          handleCurrentData={handleCurrentData}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
