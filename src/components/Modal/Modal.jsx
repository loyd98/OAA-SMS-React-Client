import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './Modal.scoped.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      message,
      leftBtnName,
      rightBtnName,
      exitOnClick,
      leftBtnOnClick,
      rightBtnOnClick,
    } = this.props;

    return (
      <div className="modal__background">
        <div className="modal flex--vertical">
          <div className="modal__exit" onClick={exitOnClick}>
            <FontAwesomeIcon icon="times" />
          </div>
          <div className="modal__icon">
            <FontAwesomeIcon icon="exclamation" size="3x" />
          </div>
          <p className="modal__title">{title}</p>
          <p className="modal__message">{message}</p>
          <div className="modal__btnContainer flex--horizontal">
            <button onClick={leftBtnOnClick}>{leftBtnName}</button>
            <button onClick={rightBtnOnClick}>{rightBtnName}</button>
          </div>
        </div>
      </div>
    );
  }
}
