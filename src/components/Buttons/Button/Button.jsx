import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Button.scoped.css';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false, isHidden: true };
  }

  render() {
    const { isClicked, isHidden } = this.state;
    const { children, isTransparent, message, type, onClick } = this.props;
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
          type="button"
          className={`${transparent} ${clicked}`}
          onMouseDown={this.toggleBtnActive}
          onMouseUp={this.toggleBtnActive}
          onMouseEnter={this.toggleCaption}
          onMouseLeave={this.toggleCaption}
          onClick={onClick}
        >
          {children}
          <div className={`caption flex--vertical ${hidden} ${position}`}>
            <span className="triangle">ab</span>
            <div className="caption__content flex--horizontal">{message}</div>
          </div>
        </button>
      </React.Fragment>
    );
  }

  toggleBtnActive = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  toggleCaption = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  isTransparent: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
};
