import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class NewRoleModal extends React.Component {
  state = {
    description: ''
  };

  render() {
    const {
      roleName,
      show,
      handleRoleSubmit,
      handleRoleCancel,
      handleDescriptionChange
    } = this.props;
    const { description } = this.state;

    return (
      // TODO center modal
      // TODO onHide should be bound to a cancel.
      <Modal show={show} onHide={handleRoleCancel}>
        <Modal.Header>
          <Modal.Title>Add new role: &quot;{roleName}&quot;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRoleSubmit}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="What does this role involve?"
                type="text"
              />
            </Form.Group>
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
                onClick={handleRoleSubmit}
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

export default NewRoleModal;
