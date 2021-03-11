import React, { Component } from 'react';
import './SearchBar.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="search flex--horizontal">
        <div className="flex--horizontal">
          <input />
          <button type="button">
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
        <div className="flex--horizontal">
          <FontAwesomeIcon icon="user" />
          <p>Username</p>
        </div>
      </div>
    );
  }
}
