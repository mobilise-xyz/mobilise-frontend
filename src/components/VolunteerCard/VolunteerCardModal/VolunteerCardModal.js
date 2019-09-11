import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function VolunteerCardModal(props) {
  const { show, onHide, volunteer } = props;

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
          {volunteer.user.firstName} {volunteer.user.lastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This volunteer is great</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VolunteerCardModal;
