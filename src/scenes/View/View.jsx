import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import './View.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Modal from '../../components/Modal/Modal';

const config = require('../../data.config');

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  toggleClick = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };

  returnToDashboard = () => {
    const { isEditing } = this.state;
    const { history, setShowModal } = this.props;

    if (!isEditing) {
      history.push('/dashboard');
    } else {
      setShowModal(true);
    }
  };

  render() {
    const { isEditing } = this.state;
    const {
      history,
      viewedData,
      showModal,
      setShowModal,
      currentTable,
    } = this.props;
    let button;
    let inputs;

    if (!isEditing) {
      button = (
        <Button
          isTransparent
          message="Edit"
          type="rigth"
          onClick={this.toggleClick}
        >
          <FontAwesomeIcon icon="edit" />
        </Button>
      );

      inputs = config.ordering[currentTable].map((key) => {
        return (
          <div key={key.key} className="view__detailContainer">
            <div className="view__detailTitle">{key.name}</div>
            <input
              disabled
              type="text"
              defaultValue={
                viewedData[key.key] === null ? '' : viewedData[key.key]
              }
            />
          </div>
        );
      });
    } else {
      button = (
        <div className="flex--horizontal">
          <Button isTransparent message="Submit" type="rigth">
            <FontAwesomeIcon icon="share-square" />
          </Button>
          <Button
            isTransparent
            message="Cancel"
            type="rigth"
            onClick={this.toggleClick}
          >
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
      );

      inputs = config.ordering[currentTable].map((key) => {
        return (
          //TODO
          <div key={key.key} className="view__detailContainer">
            <div className="view__detailTitle">{key.name}</div>
            {key.key === 'createdBy' ||
            key.key === 'creationDate' ||
            key.key === 'lastModifiedBy' ||
            key.key === 'lastModifiedDate' ? (
              <input
                disabled
                type="text"
                defaultValue={viewedData[key.key] || ''}
              />
            ) : (
              <input
                type="text"
                className="view__inputActive"
                defaultValue={viewedData[key.key] || ''}
              />
            )}
          </div>
        );
      });
    }

    return (
      <>
        {showModal && (
          <Modal
            title="Discard your changes?"
            message="The changes in the form have not been submitted yet. Would you like to discard them and return to the Dashboard page, or cancel and return to the Editing page?"
            leftBtnName="Cancel"
            rightBtnName="Discard"
            exitOnClick={() => setShowModal(false)}
            leftBtnOnClick={() => setShowModal(false)}
            rightBtnOnClick={() => {
              setShowModal(false);
              history.push('/dashboard');
            }}
          />
        )}
        <Navigation />
        <div className="view flex--horizontal">
          <div className="view__left">
            <div className="view__titlebar flex--horizontal">
              <p>Details</p>
              {button}
            </div>
            <form className="view__details">{inputs}</form>
          </div>
          <div className="view__right">
            <div className="view__titlebar flex--horizontal">
              <p>Tables</p>
              <Button
                isTransparent
                message="Return to Dashboard"
                type="right"
                onClick={() => this.returnToDashboard()}
              >
                <FontAwesomeIcon icon="arrow-left" />
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(View);
