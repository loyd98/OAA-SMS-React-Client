import React, { Component } from 'react';
import './Navigation.scoped.css';

import Logo from './Logo/Logo';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="nav flex--vertical">
        <Logo />
      </nav>
    );
  }
}

export default Navigation;
