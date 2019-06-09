import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalRoleBadge from '../../RoleBadges/ModalRoleBadge';
import RepeatBookingForm from './RepeatBookingForm';

const BookingRightPane = ({
  shiftData,
  repeatedType,
  until,
  handleChange,
  handleSelect,
  selected
}) => {
  const shiftRepeats = shiftData.repeatedId !== null;

  const repeatForm = shiftRepeats ? (
    <RepeatBookingForm
      shiftData={shiftData}
      repeatedType={repeatedType}
      until={until}
      handleChange={handleChange}
    />
  ) : null;

  return (
    <>
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
              <ModalRoleBadge
                key={shiftData.id + r.role.name}
                name={r.role.name}
                handleSelect={handleSelect}
                selected={selected}
                onModal
                colour={r.role.colour}
              />
            ) : null;
          })}
        </Col>
      </Row>
      <Row>
        <Col>{repeatForm}</Col>
      </Row>
    </>
  );
};

export default BookingRightPane;
