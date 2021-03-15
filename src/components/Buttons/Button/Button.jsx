import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Button.scoped.css';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false, isHidden: true };
  }

  toggleBtnActive = () => {
    const { isClicked } = this.state;

    this.setState({ isClicked: !isClicked });
  };

  hideCaption = () => {
    this.setState({ isHidden: true });
  };

  unhideCaption = () => {
    this.setState({ isHidden: false });
  };

  render() {
    const { isClicked, isHidden } = this.state;
    const { children, isTransparent, message, type, onClick, id } = this.props;
    const transparent = isTransparent
      ? `button flex--vertical transparent`
      : 'button flex--vertical';
    const clicked = isClicked ? 'btn--active' : '';
    const hidden = !message ? 'hidden' : isHidden ? 'hidden' : '';
    const position =
      type === 'center' || type === 'undefined'
        ? ''
        : type === 'left'
        ? 'caption__left'
        : 'caption__right';

    return (
      <React.Fragment>
        <button
          data-id={id}
          type="button"
          className={`${transparent} ${clicked}`}
          onMouseDown={this.toggleBtnActive}
          onMouseUp={this.toggleBtnActive}
          onMouseEnter={this.unhideCaption}
          onMouseLeave={this.hideCaption}
          onClick={onClick}
        >
          {children}
          <div
            data-id={id}
            className={`caption flex--vertical ${hidden} ${position}`}
          >
            <span data-id={id} className="triangle">
              ab
            </span>
            <div data-id={id} className="caption__content flex--horizontal">
              {message}
            </div>
          </div>
        </button>
      </React.Fragment>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  isTransparent: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
};
