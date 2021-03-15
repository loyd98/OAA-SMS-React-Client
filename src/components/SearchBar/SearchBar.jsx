import React, { Component } from 'react';
import './SearchBar.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { username, searchQuery, handleSearch } = this.props;

    return (
      <div className="search flex--horizontal">
        <div className="search__container flex--horizontal">
          <input
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="button">
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
        <div className="username flex--horizontal">
          <FontAwesomeIcon icon="user" />
          <p>{username}</p>
        </div>
      </div>
    );
  }
}
