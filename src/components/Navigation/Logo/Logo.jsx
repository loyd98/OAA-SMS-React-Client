import React, { Component } from 'react';
import './Logo.scoped.css';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="logo flex--vertical">
        <p>OAA SMS</p>
      </div>
    );
  }
}
