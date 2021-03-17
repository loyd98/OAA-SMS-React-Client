import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import './View.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import Table from '../../components/Table/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Modal from '../../components/Modal/Modal';
import Add from '../Add/Add';

class View extends Component {
  constructor(props) {
    super(props);

    const { config, currentTable } = this.props;
    const tableInView = config.tablesInView[currentTable][0];
    const addForm = config.ordering[tableInView].map((item) => ({
      [item.key]: '',
    }));

    this.state = {
      showAdd: false,
      isEditing: false,
      tableInView,
      addForm,
    };
  }

  setShowModal = (showModal) => this.setState({ showModal });

  handleEditToggle = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };

  handleModalCancel = () => {
    this.setState({ isEditing: !isEditing, showModal: false });
  };

  handleCancelClick = () => {
    const { isEditing } = this.state;
    const { setEditForm, viewedData } = this.props;

    const filteredKeys = Object.keys(viewedData).filter((key) => {
      if (
        key !== 'createdBy' &&
        key !== 'creationDate' &&
        key !== 'lastModifiedBy' &&
        key !== 'lastModifiedDate'
      ) {
        return key;
      }
    });

    const editForm = {};
    for (let key of filteredKeys) {
      editForm[key] = '';
    }

    for (let key of filteredKeys) {
      editForm[key] = viewedData[key];
    }

    console.log(editForm);
    setEditForm(editForm);
    this.setState({ isEditing: !isEditing });
  };

  handleReturnToDashboard = () => {
    const { isEditing } = this.state;
    const { history } = this.props;

    if (!isEditing) {
      history.push('/dashboard');
    } else {
      this.setShowModal(true);
    }
  };

  handleSubmitClick = (e) => {
    const { handleEditFormSubmit } = this.props;

    handleEditFormSubmit(e);
    this.handleEditToggle();
  };

  handleDiscardClick = () => {
    const { history } = this.props;

    this.setShowModal(false);
    history.push('/dashboard');
  };

  handleAddFormField = (e) => {
    this.setState({});
  };

  handleShowAdd = (showAdd) => this.setState({ showAdd });

  render() {
    const { isEditing, showModal, showAdd, tableInView } = this.state;
    const {
      setEditFormField,
      currentTable,
      config,
      editForm,
      dataInView,
    } = this.props;
    const currentString =
      currentTable.toString()[0].toUpperCase() +
      currentTable.toString().slice(1);

    console.log(dataInView);

    let button;
    let inputs;

    inputs = config.ordering[currentTable].map((key) => {
      return (
        <div key={key.key} className="view__detailContainer">
          <div className="view__detailTitle">{key.name}</div>
          <input
            disabled={!isEditing}
            name={key.key}
            type="text"
            value={editForm[key.key] == null ? '' : editForm[key.key]}
            onChange={(e) => setEditFormField(e.target.name, e.target.value)}
          />
        </div>
      );
    });

    if (!isEditing) {
      button = (
        <Button
          isTransparent
          message="Edit"
          type="right"
          onClick={this.handleEditToggle}
        >
          <FontAwesomeIcon icon="edit" />
        </Button>
      );
    } else {
      button = (
        <div className="flex--horizontal">
          <Button
            isTransparent
            message="Submit"
            type="rigth"
            onClick={(e) => this.handleSubmitClick(e)}
          >
            <FontAwesomeIcon icon="share-square" />
          </Button>
          <Button
            isTransparent
            message="Cancel"
            type="right"
            onClick={this.handleCancelClick}
          >
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
      );
    }

    console.log(currentString);

    return (
      <>
        {showAdd && (
          <Add
            currentTable={tableInView}
            setShowAdd={this.handleShowAdd}
            // setAddFormField,
            config={config}
            handleAddFormSubmit={handleAddFormSubmit}
          />
        )}
        {showModal && (
          <Modal
            title="Discard your changes?"
            message="The changes in the form have not been submitted yet. Would you like to discard them and return to the Dashboard page, or cancel and return to the form?"
            leftBtnName="Cancel"
            rightBtnName="Discard"
            exitOnClick={() => this.setShowModal(false)}
            leftBtnOnClick={() => this.setShowModal(false)}
            rightBtnOnClick={this.handleDiscardClick}
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
              <div className="flex--horizontal">
                <p>{currentString}</p>
                <Button
                  isTransparent
                  message={`Add ${currentTable}`}
                  type="right"
                  onClick={() => this.handleShowAdd(true)}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
              </div>

              <Button
                isTransparent
                message="Return to Dashboard"
                type="right"
                onClick={() => this.handleReturnToDashboard()}
              >
                <FontAwesomeIcon icon="arrow-left" />
              </Button>
            </div>
            <Table
              fields={config.ordering[currentTable]}
              items={dataInView}
              colLimit={5}
              handleDelete={console.log}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(View);
