import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RoleBadge from '../RoleBadge';
import '../../ShiftCard.css';

const VolunteerShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleSelect,
  selected,
  handleBook,
  booked
}) => (
  <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
    <Modal.Header>
      <Modal.Title>{shiftData.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <h6>Choose a role to book</h6>
      {shiftData.requirements.map(r => {
        // Only show roles that are available to book
        // i.e. numberRequired > 0
        return r.numberRequired > 0 ? (
          <RoleBadge
            key={shiftData.id + r.role.name}
            name={r.role.name}
            selected={selected}
            handleSelect={handleSelect}
          />
        ) : null;
      })}
    </Modal.Body>

    <Modal.Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem'
      }}
    >
      <Button variant="outline-secondary" onClick={() => onHide(false)}>
        Close
      </Button>
      <Button
        variant="outline-primary"
        type="submit"
        disabled={booked}
        onClick={handleBook}
      >
        Book
      </Button>
    </Modal.Footer>
  </Modal>
);

export default VolunteerShiftCardModal;
