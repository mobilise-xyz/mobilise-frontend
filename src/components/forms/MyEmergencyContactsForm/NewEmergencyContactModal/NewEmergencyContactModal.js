import React from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';

class NewEmergencyContactModal extends React.Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      email: null,
      telephone: '',
      relation: ''
    }
  };

  handleDataChange = e => {
    const { id, value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [id]: value
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const { data } = this.state;
    handleSubmit(
      data.firstName,
      data.lastName,
      data.email,
      data.telephone,
      data.relation
    );
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
            Add a new contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    id="firstName"
                    required
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    id="lastName"
                    required
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    id="telephone"
                    required
                    pattern="[0-9]{7,}"
                    title="Must be a valid mobile phone number"
                    type="tel"
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group>
              <Form.Label>Relation</Form.Label>
              <Form.Control
                id="relation"
                required
                type="text"
                onChange={this.handleDataChange}
              />
            </Form.Group>
            <div className="text-center" style={{ margin: 'auto' }}>
              <Button
                variant="primary"
                type="submit"
                className="btn-confirm"
                block
              >
                Add contact
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewEmergencyContactModal;
