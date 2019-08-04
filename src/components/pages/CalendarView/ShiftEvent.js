import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import shiftTypes from '../../../__types/shifts.types';
import Shift, { shiftStatus } from '../../Shift';

const generateRequirements = () => {};

const EventRendering = ({
  toggleModal,
  isDeleted,
  isBooked,
  isRecommended,
  shiftData,
  isSelected,
  isAdmin,
  type
}) => (
  <Container>
    <Row>
      <Col>
        <p>{shiftData.address}</p>
      </Col>
    </Row>
    <Row noGutters>
      {generateRequirements(shiftData, isSelected, isAdmin, type)}
    </Row>
    <Button
      type="button"
      variant="outline-primary"
      onClick={toggleModal}
      disabled={isDeleted || isBooked}
      className={`btn-more-info ${isRecommended ? 'btn-recommended' : ''}`}
    >
      Info
      <span className="sr-only">Card information button</span>
    </Button>
  </Container>
);

const ShiftEvent = ({ event }) => {
  const { shiftData, recommendedRoleNames, type, isAdmin } = event;

  return (
    <Shift
      isAdmin={isAdmin}
      shiftData={shiftData}
      recommendedRoleNames={recommendedRoleNames}
      key={`shiftcard-${shiftData.id}`}
      type={type}
      renderer={EventRendering}
    />
  );
};

const eventProptypes = PropTypes.shape({
  shiftData: shiftTypes.shift.isRequired,
  recommendedRoleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf([shiftStatus.NONE, shiftStatus.BOOKED]).isRequired
});

ShiftEvent.propTypes = {
  event: eventProptypes.isRequired
};

export default ShiftEvent;
