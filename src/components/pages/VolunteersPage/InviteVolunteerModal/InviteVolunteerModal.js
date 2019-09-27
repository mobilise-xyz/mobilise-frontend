import React from 'react';
import { Button, Collapse, Form, Modal } from 'react-bootstrap';

class InviteVolunteerModal extends React.Component {
  state = {
    isAdmin: false
  };

  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
  }

  handleChange = ({ target }) => {
    this.setState({ isAdmin: target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const { isAdmin } = this.state;
    const email = this.emailInput.current.value;
    handleSubmit(email, isAdmin);
  };

  render() {
    const { show, onHide } = this.props;
    const { isAdmin } = this.state;
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
                checked={isAdmin}
                onChange={this.handleChange}
                label="Invite as volunteer co-ordinator"
              />
            </Form.Group>
            <Collapse in={isAdmin} style={{ fontSize: 'small' }}>
              <p>
                This user will have the same privileges as you, including the
                ability to create shifts, view and invite volunteers, alert
                volunteers etc.
              </p>
            </Collapse>
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
