import React from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

class NewLinkModal extends React.Component {
  state = {
    data: {
      name: null,
      url: null
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const { data } = this.state;
    handleSubmit(data);
  };

  handleURLChange = e => {
    if (!ReactPlayer.canPlay(e.target.value)) {
      e.target.setCustomValidity('Cannot play video at this URL');
    } else {
      e.target.setCustomValidity('');
    }
    this.handleDataChange(e);
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
            Add a new video link
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                required
                onChange={this.handleDataChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <InputGroup>
                <Form.Control
                  id="url"
                  required
                  onChange={this.handleURLChange}
                  type="url"
                />
              </InputGroup>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="btn-confirm"
              block
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewLinkModal;
