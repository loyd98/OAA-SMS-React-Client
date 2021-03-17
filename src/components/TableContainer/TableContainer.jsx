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

    this.state = {
      height: 0,
      currentPage: 1,
      numOfPages: 1,
      itemsPerPage: Math.floor((window.innerHeight - 250) / 40),
    };
  }

  componentDidMount() {
    const temp = sessionStorage.getItem('pageDetails');
    const loadedData = JSON.parse(temp);

    if (loadedData) {
      const { currentPage, numOfPages, itemsPerPage } = loadedData;
      this.setState({ currentPage, numOfPages, itemsPerPage });
    } else {
      const height = window.innerHeight;
      const currentPage = 1;
      const itemsPerPage = Math.floor((height - 250) / 40);
      let numOfPages;

      if (this.props.currentData.length === 0) {
        numOfPages = 1;
      } else {
        numOfPages = Math.ceil(this.props.currentData.length / itemsPerPage);
      }

      this.setState({ currentPage, itemsPerPage, numOfPages });
      const pageDetails = JSON.stringify({
        currentPage,
        itemsPerPage,
        numOfPages,
      });

      sessionStorage.setItem('pageDetails', pageDetails);
    }
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentData !== this.props.currentData) {
      const height = window.innerHeight;
      const itemsPerPage = Math.floor((height - 250) / 40);
      const numOfPages =
        Math.ceil(this.props.currentData.length / itemsPerPage) || 1;
      this.setState({ numOfPages });
    }

    // Go to the nearest number of pages when current page is greater than require number of pages
    const { numOfPages, currentPage } = this.state;
    const { currentTable } = this.props;

    if (prevState.numOfPages !== numOfPages && currentPage > numOfPages) {
      this.setState({ currentPage: numOfPages || 1 });
    }

    if (prevProps.currentTable !== currentTable) {
      this.setState({
        currentDropdownItem: config.dropdowns[currentTable][0].name,
      });
    }
  }

  handleLeftClick = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage > 1 ? prevState.currentPage - 1 : 1,
    }));
  };

  handleRightClick = () => {
    const { numOfPages } = this.state;

    this.setState((prevState) => ({
      currentPage:
        prevState.currentPage < numOfPages
          ? prevState.currentPage + 1
          : numOfPages,
    }));
  };

  sliceItems = (data, itemsPerPage, currentPage) => {
    currentPage--;
    let start = itemsPerPage * currentPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);
    return paginatedItems;
  };

  updateHeight = () => {
    const { height, currentPage } = this.state;
    const { currentData } = this.props;

    this.setState({ height: window.innerHeight });

    const itemsPerPage = Math.floor((height - 250) / 40);
    const numOfPages = Math.ceil(currentData.length / itemsPerPage);
    if (itemsPerPage > 0) {
      this.setState({ currentPage, itemsPerPage, numOfPages });
    }
  };

  handleRedirect = (id) => {
    const { history, handleRead } = this.props;
    handleRead('http://localhost:8080', `/donor/${id}`)
      .then((res) => history.push('/view'))
      .catch((err) => console.log(err));
  };

  render() {
    const { config, currentTable, currentData } = this.props;
    const { currentPage, numOfPages, itemsPerPage } = this.state;
    console.log(currentData);
    const tables = config.tables;
    const fields = config.ordering[currentTable];
    const items = this.sliceItems(currentData, itemsPerPage, currentPage);
    const colLimit = 7;
    // const dropdownItems = config.dropdowns[currentTable];

    return (
      <table className="table">
        <thead id="table__top">
          <tr className="table__topRow flex--horizontal">
            <td className="flex--horizontal">
              <div className="table__flags flex--horizontal">
                {tables.map((table) => {
                  if (table.toLowerCase() === currentTable) {
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
                {/* <Dropdown
                  title="Dropdown"
                  list={dropdownItems.map((i) => i.name)}
                /> */}
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
          redirectToView={this.handleRedirect}
          colLimit={7}
          handleDelete={this.handleDeleteClick}
        />
      </table>
    );
  }
}

export default withRouter(TableContainer);
