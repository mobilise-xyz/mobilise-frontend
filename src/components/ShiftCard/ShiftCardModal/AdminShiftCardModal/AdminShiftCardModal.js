import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import RoleBadge from '../RoleBadge';
import '../../ShiftCard.css';

const AdminShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleBook,
  selected,
  handleDelete
}) => (
  <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
    <Modal.Header>
      <Modal.Title>{shiftData.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {shiftData.requirements.map(r => {
        // Only show roles that are available to book
        // i.e. numberRequired > 0
        return r.numberRequired > 0 ? (
          <RoleBadge
            key={shiftData.id + r.role.name}
            name={r.role.name}
            number={r.numberRequired}
            selected={selected}
            handleBook={handleBook}
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
      <Button className="mr-2" variant="outline-danger" onClick={handleDelete}>
        Delete
      </Button>
      <ButtonToolbar role="toolbar">
        <Button className="mr-2" variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="outline-primary" type="submit">
          Save changes
        </Button>
      </ButtonToolbar>
    </Modal.Footer>
  </Modal>
);

export default AdminShiftCardModal;
