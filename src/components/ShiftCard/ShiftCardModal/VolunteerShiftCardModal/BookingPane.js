import React from 'react';
import { Button, Col, Collapse, Row } from 'react-bootstrap';
import RepeatBookingForm from './RepeatBookingForm';
import VolunteerRoleBadge from '../../RoleBadges/VolunteerRoleBadge';

const BookingPane = ({
  shiftData,
  repeatedType,
  until,
  handleChange,
  handleSelect,
  handleBook,
  selected
}) => {
  const shiftRepeats = shiftData.repeatedId !== null;
  const selectedRoleInvolves =
    selected === ''
      ? ''
      : shiftData.requirements.find(r => r.role.name === selected).role
          .involves;

  console.log(selectedRoleInvolves);

  return (
    <>
      <Row>
        <Col>
          <h6>
            <strong>Click to choose a role to book!</strong>
          </h6>
        </Col>
      </Row>
      <Row className="pb-2">
        <Col>
          {shiftData.requirements.map(r => {
            // Only show roles that are available to book
            // i.e. numberRequired > 0
            return r.numberRequired > 0 ? (
              <VolunteerRoleBadge
                key={shiftData.id + r.role.roleName}
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
      <Collapse in={selected !== ''}>
        <div>
          <Row>
            <Col>
              <h6>This role involves:</h6>
              <p>{selectedRoleInvolves}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {shiftRepeats ? (
                <RepeatBookingForm
                  shiftData={shiftData}
                  repeatedType={repeatedType}
                  until={until}
                  handleChange={handleChange}
                  handleBook={handleBook}
                  selected={selected}
                />
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-success"
                type="button"
                disabled={shiftData.bookSuccess === true || selected === ''}
                onClick={() => handleBook(repeatedType, until)}
                style={{ marginLeft: 'auto' }}
                block
              >
                Book
              </Button>
            </Col>
          </Row>
        </div>
      </Collapse>
    </>
  );
};

export default BookingPane;
