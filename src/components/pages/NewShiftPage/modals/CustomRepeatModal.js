import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class CustomRepeatModal extends React.Component {
  state = {
    // frequency: '', // How often to repeat (e.g once per...)
    // timeFrame: '', // Time frame to repeat over (e.g. daily/weekly)
    // repeatDays: '', // Specific days of week to repeat
  };

  // TODO: try and reduce duplication here with NewShiftPage (Binding??)
  handleDataChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  render() {
    const { show, handleRepeatSubmit, handleRepeatCancel } = this.props;
    // const { frequency, timeFrame, repeatDays } = this.state;

    return (
      // TODO center modal
      // TODO onHide should be bound to a cancel.
      <Modal show={show} onHide={handleRepeatCancel}>
        <Modal.Header>
          <Modal.Title>Add Custom Repetition </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form onSubmit={handleCustomRepeatSubmit}> */}
          {/* TODO: add form fields here for custom repeat modal */}
          <div className="text-center">
            <Button
              variant="secondary"
              type="button"
              onClick={handleRepeatCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleRepeatSubmit}
            >
              Create
            </Button>
          </div>
          {/* </Form> */}
        </Modal.Body>
      </Modal>
    );
  }
}

export default CustomRepeatModal;
