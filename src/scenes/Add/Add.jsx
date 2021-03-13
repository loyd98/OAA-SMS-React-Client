import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './Add.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import { withRouter } from 'react-router';

const config = require('../../data.config');

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { currentTable, setShowAdd } = this.props;

    return (
      <div className="add__background">
        <form className="add">
          <Button isTransparent onClick={() => setShowAdd(false)}>
            Return to Dashboard
          </Button>
          {config.ordering[currentTable].map((key) => {
            return (
              <div key={key.key} className="view__detailContainer">
                <div className="view__detailTitle">{key.name}</div>
                <input type="text" />
              </div>
            );
          })}
          <Button isTransparent onClick={() => setShowAdd(false)}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Add);
