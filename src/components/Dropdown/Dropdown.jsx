import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './Dropdown.scoped.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isListOpen: false,
      headerTitle: props.title,
    };
  }

  toggleList = () => {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  };

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { list } = this.props;

    return (
      <div className="wrapper">
        <button
          type="button"
          className="header flex--horizontal"
          onClick={this.toggleList}
        >
          <div className="header__title">{headerTitle}</div>
          {isListOpen ? (
            <FontAwesomeIcon icon="angle-up" />
          ) : (
            <FontAwesomeIcon icon="angle-down" />
          )}
        </button>
        {isListOpen && (
          <div role="list" className="header__list flex--vertical">
            {list.map((item) => (
              <button
                type="button"
                className="header__listItem"
                key={item}
                onClick={() => this.selectItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
