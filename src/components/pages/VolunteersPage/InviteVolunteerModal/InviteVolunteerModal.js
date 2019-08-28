import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class InviteVolunteerModal extends React.Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.adminCheck = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const email = this.emailInput.current.value;
    const isAdmin = this.adminCheck.current.value;
    handleSubmit(email, isAdmin);
  };

  render() {
    const { show, onHide } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Invite a new volunteer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                required
                ref={this.emailInput}
                type="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                ref={this.adminCheck}
                label="Make an admin"
              />
            </Form.Group>
            <div className="text-center" style={{ margin: 'auto' }}>
              <Button
                variant="primary"
                type="submit"
                className="btn-confirm"
                block
              >
                Invite
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default InviteVolunteerModal;
