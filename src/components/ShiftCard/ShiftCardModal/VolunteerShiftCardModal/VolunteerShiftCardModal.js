import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import moment from 'moment';
import RoleBadge from '../RoleBadge';
import '../../ShiftCard.css';

const VolunteerShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleSelect,
  selected,
  handleBook
}) => (
  <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
    <Modal.Header>
      <Modal.Title>{shiftData.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Row>
        <Col>
          <h6>Choose a role to book</h6>
        </Col>
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>Book repeating?</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id="bookingform">
            <Form.Group>
              <Form.Label>Repeat frequency</Form.Label>
              {/* Only enable this form if repeatedId is not null. */}
              <Form.Control
                as="select"
                name="repeatfrequency"
                disabled={shiftData.repeatedId === null}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Until</Form.Label>
              {/* The user should not be able to select before today's date, and not after the end start of the repeating shift. */}
              <Form.Control
                type="date"
                name="repeatuntil"
                min={moment().format('YYYY-MM-DD')}
                disabled={shiftData.repeatedId === null}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Modal.Body>

    <Modal.Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem'
      }}
    >
      <Button
        variant="outline-secondary"
        onClick={() => onHide(false)}
        form="bookingform"
      >
        Close
      </Button>
      <Button
        variant="outline-primary"
        type="submit"
        disabled={shiftData.bookSuccess === false}
        onClick={handleBook}
      >
        Book
      </Button>
    </Modal.Footer>
  </Modal>
);

export default VolunteerShiftCardModal;
