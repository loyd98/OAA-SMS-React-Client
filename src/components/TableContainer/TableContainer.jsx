import PropTypes, { string } from 'prop-types';
import React, { Component } from 'react';
import './TableContainer.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Buttons/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import { Redirect, withRouter } from 'react-router';
import Table from '../Table/Table';

const config = require('../../data.config');

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { data, currentTable, handleDelete, handleTabClick } = this.props;
    const items = this.sliceItems(data, itemsPerPage, currentPage);
    const dropdownItems = config.dropdowns[currentTable];

    if (isRedirect) {
      this.setState({ isRedirect: false });
      return <Redirect to="/view" />;
    }
    return (
      <table className="table">
        <thead id="table__top">
          <tr className="table__topRow flex--horizontal">
            <td className="flex--horizontal">
              <div className="table__flags flex--horizontal">
                {this.tables.map((table) => {
                  if (
                    table ===
                    currentTable.charAt(0).toUpperCase() + currentTable.slice(1)
                  ) {
                    return (
                      <div
                        data-id={table}
                        key={table}
                        className="table__flag flex--horizontal flag--active"
                      >
                        <span>{table}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        data-id={table}
                        key={table}
                        className="table__flag flex--horizontal"
                        onClick={(e) => this.handleTabClick(e)}
                      >
                        <span>{table}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </td>
            <td className="table__pagination flex--horizontal">
              <Button isTransparent onClick={this.handleLeftClick}>
                <FontAwesomeIcon icon="arrow-left" />
              </Button>
              <span>
                <sup>{currentPage}</sup>&frasl;<sub>{numOfPages}</sub>
              </span>
              <Button isTransparent onClick={this.handleRightClick}>
                <FontAwesomeIcon icon="arrow-right" />
              </Button>
            </td>
          </tr>
        </thead>
        <thead id="table__middle" className="flex--horizontal">
          <tr>
            <td className="flex--horizontal">
              <div className="flex--horizontal">
                <Button isTransparent message="Import" type="left">
                  <FontAwesomeIcon icon="file-upload" />
                </Button>
                <Button isTransparent message="Export" type="left">
                  <FontAwesomeIcon icon="file-download" />
                </Button>
                <Dropdown
                  title="Dropdown"
                  list={dropdownItems.map((i) => i.name)}
                />
                <Button isTransparent message="Sort" type="center">
                  <FontAwesomeIcon icon="sort" />
                </Button>
              </div>
              <div className="flex--horizontal">
                <Button
                  isTransparent
                  message="Add Entry"
                  type="right"
                  onClick={this.handleAddClick}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
              </div>
            </td>
          </tr>
        </thead>
        <Table
          fields={fields}
          items={items}
          redirectToView={this.handleViewClick}
          colLimit={7}
          handleDelete={this.handleDeleteClick}
        />
      </table>
    );
  }
}

export default withRouter(TableContainer);
