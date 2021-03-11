import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import './View.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const queryString = require('query-string');
const config = require('../../data.config');

export default class View extends Component {
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

  render() {
    const { data, location } = this.props;
    const { isEditing } = this.state;
    const parsed = queryString.parse(location.search);

    const datum = data.find((obj) => obj.id == parsed.id);
    console.log(datum);

    let button;

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
    } else {
      button = (
        <>
          <Button
            isTransparent
            message="Cancel"
            type="rigth"
            onClick={this.toggleClick}
          >
            <FontAwesomeIcon icon="times" />
          </Button>
          <Button isTransparent message="Submit" type="rigth">
            <FontAwesomeIcon icon="share-square" />
          </Button>
        </>
      );
    }

    return (
      <>
        <Navigation></Navigation>
        <div className="view flex--horizontal">
          <div className="view__left">
            <div className="view__titlebar flex--horizontal">
              <p>Details</p>
              {button}
            </div>
            <div className="view__details">
              {config.ordering.donors.map((key) => {
                return (
                  <div className="view__detailContainer">
                    <div className="view__detailTitle">{key.name}</div>
                    <input type="text" placeholder={datum[key.key]} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="view__right"></div>
        </div>
      </>
    );
  }
}
