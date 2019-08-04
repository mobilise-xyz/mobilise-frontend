import React from 'react';
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Popover,
  Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './ShiftCard.css';
import utils from '../../_helpers/utils';
import CardRoleBadge from './RoleBadges/CardRoleBadge';
import shiftTypes from '../../__types/shifts.types';

const generateRequirements = (shiftData, selected, isAdmin, type) =>
  shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0

    const { numberRequired, role, bookings } = r;
    const numberOfBookings = bookings ? bookings.length : 0;
    const numberRemaining = numberRequired - numberOfBookings;
    const adminSees = isAdmin ? true : numberRemaining > 0;

    return numberRequired > 0 && adminSees > 0 ? (
      <CardRoleBadge
        isAdmin={isAdmin}
        name={role.name}
        selected={selected}
        colour={role.colour}
        number={type === 'booked' ? '' : numberRequired - numberRemaining}
        numberRequired={numberRequired}
        key={`role-badge-${shiftData.id}-${role.name}`}
      />
    ) : null;
  });

const generateGoogleMapsLink = address => {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps?safe=strict&q=${encodedAddress}&um=1&ie=UTF-8&sa=X&ved=0ahUKEwiGr7nZxNXiAhXBUBUIHQq6DrQQ_AUIESgC`;
};

const generateGoogleMapsImage = address => {
  const encodedAddress = encodeURIComponent(address);
  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=13&size=512x200&maptype=roadmap&markers=color:red%7C${encodedAddress}&&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
};

// shiftData consists of title, description, date, start, stop, address

const ShiftCard = ({
  toggleModal,
  shiftData,
  type,
  isAdmin,
  isDeleted,
  isBooked,
  isRecommended,
  isCancelled,
  isSelected
}) => {
  const recommendedPopover = (
    <Popover id="popover-basic" title="Recommended Shift">
      This shift is recommended specifically for you and would help City Harvest
      more if you booked onto it.
    </Popover>
  );

  const cardClass = `shift-card ${isBooked ? 'booked' : ''} ${
    isRecommended ? 'recommended' : ''
  } ${isDeleted ? 'deleted' : ''} ${isCancelled ? 'cancelled' : ''}`;

  return (
    <Card className={cardClass}>
      <a
        title="Click here to see where the shift is on Google Maps!"
        href={generateGoogleMapsLink(shiftData.address)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card.Img
          variant="top"
          alt="Shift location map"
          src={generateGoogleMapsImage(shiftData.address)}
        />
      </a>
      <Card.Body>
        <Card.Title>{shiftData.title}</Card.Title>
        <Row>
          <Col>{shiftData.address}</Col>
          <Col>
            {utils.formatTime(shiftData.start)} -{' '}
            {utils.formatTime(shiftData.stop)}
          </Col>
        </Row>
        <Row noGutters>
          {generateRequirements(shiftData, isSelected, isAdmin, type)}
        </Row>
      </Card.Body>
      <Card.Footer className={isRecommended ? 'bg-primary' : null}>
        <Row>
          <Col lg={4} md={12} sm={12} xs={12}>
            <Button
              type="button"
              variant="outline-primary"
              onClick={toggleModal}
              disabled={isDeleted || isBooked}
              className={`btn-more-info ${
                isRecommended ? 'btn-recommended' : ''
              }`}
            >
              Info
              <span className="sr-only">Card information button</span>
            </Button>
          </Col>
          {isRecommended ? (
            <Col className="mt-2" lg={8} md={12} sm={12} xs={12}>
              <OverlayTrigger placement="right" overlay={recommendedPopover}>
                <div>
                  <span className="ic-recommended">RECOMMENDED</span>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="ml-2"
                    color="white"
                  />
                </div>
              </OverlayTrigger>
            </Col>
          ) : null}
        </Row>
      </Card.Footer>
    </Card>
  );
};

ShiftCard.propTypes = {
  shiftData: shiftTypes.shift.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isBooked: PropTypes.bool.isRequired,
  isRecommended: PropTypes.bool.isRequired,
  isCancelled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default ShiftCard;
