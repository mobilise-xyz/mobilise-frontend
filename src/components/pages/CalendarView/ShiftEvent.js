import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import shiftTypes from '../../../__types/shifts.types';
import Shift, { shiftStatus } from '../../Shift';
import './ShiftEvent.css';

const RoleDot = ({ colour = 'info' }) => {
  return <span className="role-dot" style={{ backgroundColor: colour }} />;
};

const generateRequirements = (shiftData, type) =>
  shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0

    const { numberRequired, role } = r;
    if (type === shiftStatus.BOOKED && !r.booked) {
      return null;
    }
    return numberRequired > 0 ? (
      <RoleDot
        colour={role.colour}
        key={`role-badge-${shiftData.id}-${role.name}`}
      />
    ) : null;
  });

const EventRendering = ({
  toggleModal,
  isDeleted,
  isBooked,
  isRecommended,
  type,
  shiftData
}) => (
  <Container
    // Fill parent container
    style={{
      border: 'solid',
      padding: '1em',
      height: '100%',
      width: '100%'
    }}
  >
    <Row>
      <Col>
        <h5>{shiftData.title}</h5>
      </Col>
    </Row>
    <Row noGutters>{generateRequirements(shiftData, type)}</Row>
    <button
      type="button"
      onClick={toggleModal}
      disabled={isDeleted || isBooked}
      className={`calendar-btn-more-info ${
        isRecommended ? 'calendar-btn-recommended' : ''
      } stretched-link`}
    />
    {type === shiftStatus.BOOKED ? (
      <Row>
        <Col>
          <p>BOOKED</p>
        </Col>
      </Row>
    ) : null}
  </Container>
);

const ShiftEvent = ({ event }) => {
  const { shiftData, recommendedRoleNames, type, isAdmin } = event;

  return (
    <Shift
      style={{ backgroundColor: 'green' }}
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
