import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import { Modal, Button, Icon } from 'antd';

import ComplexForm from '../forms/ComplexForm.jsx';


class TableRowActionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
  }
  
  showModal(e) {
    e.preventDefault();
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const name = {
        firstName: values.firstName,
        lastName: values.lastName
      }
      const newEmployee = values;
      newEmployee.name = name;

      this.props.dispatch(createEmployee(newEmployee, this.props.history));
    });
  }
  saveFormRef(form) {
    this.form = form;
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <span>
        <a href="#" onClick={this.showModal}>Edit</a>
        <ComplexForm
          id={this.props.id}
          ref={this.saveFormRef}
          confirmLoading={this.props.isFetching}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </span>
    )
  }
}
TableRowActionMenu.propTypes = {
  id: PropTypes.string.isRequired
};
export default withRouter(TableRowActionMenu);