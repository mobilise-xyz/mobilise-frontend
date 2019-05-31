import React from 'react';
import moment from 'moment';
import { Modal, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import RoleBadge from './RoleBadge';
import './ShiftCard.css';

const ShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleBook,
  booked,
  showBookedOverlay,
  showUnbookedOverlay,
  handleDelete
}) => (
  <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
    <Modal.Header>
      <Modal.Title>{shiftData.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {/* Top row */}
      <Row>
        <Col md={4}>
          <h6>Location</h6>
          <p>{shiftData.address}</p>
        </Col>
        <Col md={4}>
          <h6>Description</h6>
          <p>{shiftData.description}</p>
        </Col>
        <Col md={4}>
          <h6>Sign on!</h6>
          <Row>
            {shiftData.roles.map(r => {
              return (
                <RoleBadge
                  key={shiftData.id + r.name}
                  name={r.name}
                  number={r.ShiftRole.numberRequired}
                  handleBook={handleBook}
                  booked={booked}
                  showBookedOverlay={showBookedOverlay}
                  showUnbookedOverlay={showUnbookedOverlay}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
      {/* Middle row */}
      <Row>
        <Col md={4} />
        <Col md={4}>
          <h6>Date</h6>
          <p>
            {moment(shiftData.date)
              .local()
              .format('dddd, MMMM Do YYYY')}
          </p>
        </Col>
        <Col md={4} />
      </Row>
      {/* Bottom row */}
      <Row>
        <Col md={4} />
        <Col md={4}>
          <Row>
            <Col md="auto">
              <h6>Start time</h6>
              <p>
                {moment(shiftData.start, 'H:m:ss')
                  .local()
                  .format('h:mm a')}
              </p>
            </Col>
            <Col md="auto">
              <h6>End time</h6>
              <p>
                {moment(shiftData.stop, 'H:m:ss')
                  .local()
                  .format('h:mm a')}
              </p>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <h6>Managed by</h6>
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

export default ShiftCardModal;
