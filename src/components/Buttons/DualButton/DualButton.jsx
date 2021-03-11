import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './DualButton.scoped.css';

export default class DualButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { left, right } = this.props;

    return (
      <div>
        <button type="button" className="left">
          {left}
        </button>
        <button type="button" className="right">
          {right}
        </button>
      </div>
    );
  }
}

DualButton.propTypes = {
  left: PropTypes.shape.isRequired,
  right: PropTypes.shape.isRequired,
};
