import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class NewFileModal extends React.Component {
  state = {
    selectedFile: null
  };

  handleChange = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { selectedFile } = this.state;
    handleSubmit(selectedFile);
  };

  render() {
    const { show, onHide } = this.props;
    const { selectedFile } = this.state;

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
            Add a new file
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Any file added will be visible for all the volunteers.</p>
          <input type="file" onChange={this.handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button disabled={!selectedFile} onClick={this.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewFileModal;
