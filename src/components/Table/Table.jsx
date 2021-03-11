import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Table.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Buttons/Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.fields = [
      { key: '#', name: '#', width: '20px' },
      { key: 'id', name: 'Donor ID', width: '50px' },
      { key: 'accountNumber', name: 'Account Number', width: '70px' },
      { key: 'accountName', name: 'Account Name', width: '70px' },
      { key: 'cellphoneNumber', name: 'Cellphone No.', width: '70px' },
      { key: 'emailAddress', name: 'Email', width: '100px' },
      { key: 'address1', name: 'Address 1', width: '100px' },
      { key: 'address2', name: 'Address 2', width: '100px' },
      { key: 'address3', name: 'Address 3', width: '100px' },
      { key: 'address4', name: 'Address 4', width: '100px' },
      { key: 'address5', name: 'Addres 5', width: '100px' },
      { key: 'birthDate', name: 'Birth Date', width: '100px' },
      { key: 'phone1', name: 'Phone 1', width: '100px' },
      { key: 'phone2', name: 'Phone 2', width: '100px' },
      { key: 'faxNumber', name: 'Fax No.', width: '100px' },
      { key: 'companyAddress', name: 'Company Address', width: '100px' },
      { key: 'companyTIN', name: 'Company TIN', width: '100px' },
      { key: 'notes', name: 'Notes', width: '100px' },
    ];
    this.tables = ['Donors', 'Scholars', 'Scholarships', 'MOAs', 'Documents'];
    this.endColNum = 6;
    this.state = {
      height: 0,
      currentPage: 1,
      numOfPages: 1,
      itemsPerPage: Math.floor((window.innerHeight - 250) / 40),
    };
  }

  render() {
    const { height, currentPage, numOfPages, itemsPerPage } = this.state;
    const { data, currentTable } = this.props;

    const items = this.sliceItems(data, itemsPerPage, currentPage);

    return (
      <table className="table">
        <thead id="table__top">
          <tr className="table__topRow flex--horizontal">
            <td className="flex--horizontal">
              <div className="table__flags flex--horizontal">
                {this.tables.map((table) => {
                  if (table === currentTable) {
                    return (
                      <div
                        key={table}
                        className="table__flag flex--horizontal flag--active"
                      >
                        <span>{table}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={table} className="table__flag flex--horizontal">
                        <span>{table}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </td>
            <td className="table__pagination flex--horizontal">
              <Button isTransparent>
                <FontAwesomeIcon
                  icon="arrow-left"
                  onClick={this.handleLeftClick}
                />
              </Button>
              <Button isTransparent>{currentPage + ''}</Button>
              <div className="table__paginationDivider flex--vertical" />
              <Button isTransparent>{numOfPages + ''}</Button>
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
                  list={['#', 'Donor Name', 'Email Address Address Address']}
                />
                <Button isTransparent message="Sort" type="center">
                  <FontAwesomeIcon icon="sort" />
                </Button>
              </div>
              <div className="flex--horizontal">
                <Button isTransparent message="Add Entry" type="right">
                  <FontAwesomeIcon icon="plus" />
                </Button>
              </div>
            </td>
          </tr>
        </thead>
        <thead id="table__bottom">
          <tr className="table__bottomRow">
            {this.fields.slice(0, this.endColNum).map((col) => (
              <th style={{ width: col.width }} key={col.key}>
                {col.name}
              </th>
            ))}
            <th style={{ width: '50px' }} />
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr data-id={row.id} key={row.id}>
              {this.fields.slice(0, this.endColNum).map((col) => {
                if (col.key === '#') {
                  return (
                    <td style={{ width: col.width }} key={col.key}>
                      {i + 1}
                    </td>
                  );
                }

                return (
                  <td style={{ width: col.width }} key={col.key}>
                    {row[col.key]}
                  </td>
                );
              })}
              <td style={{ width: '50px' }}>
                <div className="flex--horizontal">
                  <Button isTransparent={false} message="Edit" type="right">
                    <FontAwesomeIcon icon="border-all" />
                  </Button>
                  <Button isTransparent={false} message="Delete" type="right">
                    <FontAwesomeIcon icon="times" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  handleRightClick = () => {
    if (this.state.currentPage < this.state.numOfPages) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  handleLeftClick = () => {
    if (this.state.currentPage > 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  sliceItems = (data, itemsPerPage, currentPage) => {
    currentPage--;
    let start = itemsPerPage * currentPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);
    return paginatedItems;
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const height = window.innerHeight;

      const currentPage = 1;
      const itemsPerPage = Math.floor((height - 250) / 40);
      const numOfPages = Math.ceil(this.props.data.length / itemsPerPage);

      this.setState({ currentPage, itemsPerPage, numOfPages });
    }
  }

  updateHeight = () => {
    const { height, currentPage } = this.state;
    const { data } = this.props;

    this.setState({ height: window.innerHeight });

    const itemsPerPage = Math.floor((height - 250) / 40);
    const numOfPages = Math.ceil(data.length / itemsPerPage);
    if (itemsPerPage >= 0) {
      this.setState({ currentPage, itemsPerPage, numOfPages });
    }
  };
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
