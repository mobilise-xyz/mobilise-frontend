import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PlainTextForm from '../../../forms/PlainTextForm';

class NewRoleModal extends Component {
  state = {
    roleInvolves: ''
  };

  handleInvolvesChange = e => {
    this.setState({ roleInvolves: e.currentTarget.value });
  };

  render() {
    const { roleName, show, handleRoleSubmit, handleRoleCancel } = this.props;
    const { roleInvolves } = this.state;
    return (
      // TODO onHide should be bound to a cancel.
      <Modal show={show} onHide={handleRoleCancel} centered>
        <Modal.Header>
          <Modal.Title>Add new role: &quot;{roleName}&quot;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => handleRoleSubmit(roleInvolves)}>
            <PlainTextForm
              id="roleInvolves"
              label="role description"
              placeHolder="What does this role involve?"
              content={roleInvolves}
              handleChange={this.handleInvolvesChange}
            />
            <div className="text-center">
              <Button
                variant="secondary"
                type="button"
                onClick={handleRoleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => handleRoleSubmit(roleInvolves)}
              >
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

NewRoleModal.defaultProps = {
  roleName: '',
  show: false
};

NewRoleModal.propTypes = {
  roleName: PropTypes.string,
  show: PropTypes.bool,
  handleRoleSubmit: PropTypes.func.isRequired,
  handleRoleCancel: PropTypes.func.isRequired
};

export default NewRoleModal;
