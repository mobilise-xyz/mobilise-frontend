import React from 'react';
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Popover,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import utils from '../../_helpers/utils';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from './ShiftCardModal/ShiftCardModal';
import CardRoleBadge from './RoleBadges/CardRoleBadge';
import shiftTypes from '../../__types/shifts.types';

const generateRequirements = (shiftData, selected, isAdmin, type) =>
  shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0

    const { numberRequired, role, bookings } = r;
    const numberOfBookings = bookings ? bookings.length : 0;
    const numberRemaining =
      type === 'booked' ? null : numberRequired - numberOfBookings;
    return numberRequired > 0 ? (
      <CardRoleBadge
        isAdmin={isAdmin}
        name={role.name}
        selected={selected}
        colour={role.colour}
        number={numberRemaining}
        key={`role-badge-${shiftData.id}-${role.name}`}
      />
    ) : null;
  });

const generateGoogleMapsLink = address =>
  `https://www.google.com/maps?safe=strict&q=${address}&um=1&ie=UTF-8&sa=X&ved=0ahUKEwiGr7nZxNXiAhXBUBUIHQq6DrQQ_AUIESgC`;

const generateGoogleMapsImage = address =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=13&size=512x200&maptype=roadmap&markers=color:red%7C${address}&&key=${
    process.env.REACT_APP_GOOGLE_API_KEY
  }`;

// shiftData consists of title, description, date, start, stop, address

class ShiftCard extends React.Component {
  state = {
    showModal: false,
    selected: '',
    booked: false
  };

  toggleModal = (submitted = true) => {
    const { booked } = this.state;
    this.setState(state => ({ showModal: !state.showModal }));
    if (!submitted && !booked) {
      this.setState({ selected: '' });
    }
  };

  handleDelete = () => {
    // Hide the modal
    this.toggleModal();

    // Perform deletion
    const { shiftData } = this.props;
    const { dispatch } = this.props;
    const shiftId = shiftData.id;
    dispatch(shiftsActions.deleteWithId(shiftId));
  };

  handleSelect = e => {
    const { name } = e.target;

    const { selected, booked } = this.state;

    if (booked) {
      return;
    }

    // Already selected, select.
    this.setState({
      selected: name === selected ? '' : name
    });
  };

  handleBook = (repeatedType, until) => {
    this.toggleModal();

    const { shiftData, dispatch } = this.props;
    const { selected } = this.state;

    this.setState({ selected: '' });
    dispatch(shiftsActions.book(shiftData.id, selected, repeatedType, until));
  };

  render() {
    const {
      shiftData,
      isAdmin,
      recommendedRoleNames,
      shifts,
      type
    } = this.props;
    const { showModal, selected } = this.state;

    let deleted = false;
    let booked = false;
    let isRecommended = false;
    if (type !== 'booked') {
      const thisShift = shifts.all.find(s => s.id === shiftData.id);

      deleted = thisShift.deleteSuccess === true;
      booked = thisShift.bookSuccess === true;
      isRecommended = recommendedRoleNames.length !== 0;
    }

    const recommendedPopover = (
      <Popover id="popover-basic" title="Recommended Shift">
        This shift is recommended specifically for you and would help City
        Harvest more if you booked onto it.
      </Popover>
    );

    const cardClass = `shift-card ${booked ? 'booked' : ''} ${
      isRecommended ? 'recommended' : ''
    } ${deleted ? 'deleted' : ''}`;

    return (
      <ErrorBoundary>
        <Card className={cardClass}>
          <a
            title="Shift location maps link"
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
            <Row noGutters>
              <Col>{shiftData.address}</Col>
              <Col>
                {utils.formatTime(shiftData.start)} -{' '}
                {utils.formatTime(shiftData.stop)}
              </Col>
            </Row>
            <Row noGutters>
              {generateRequirements(shiftData, selected, isAdmin, type)}
            </Row>
          </Card.Body>
          <Card.Footer className={isRecommended ? 'bg-primary' : null}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={this.toggleModal}
                      disabled={deleted || booked}
                      className={`btn-more-info ${
                        isRecommended ? 'btn-recommended' : ''
                      }`}
                    >
                      More info
                      <span className="sr-only">Card information button</span>
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col>
                    {isRecommended ? (
                      <span className="ic-recommended">
                        Recommended
                        <OverlayTrigger
                          placement="right"
                          overlay={recommendedPopover}
                        >
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            className="ml-1"
                            color="white"
                          />
                        </OverlayTrigger>
                      </span>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
          <ShiftCardModal
            isAdmin={isAdmin}
            shiftData={shiftData}
            show={showModal}
            onHide={this.toggleModal}
            handleSelect={this.handleSelect}
            selected={selected}
            handleDelete={this.handleDelete}
            handleBook={this.handleBook}
            type={type}
          />
        </Card>
      </ErrorBoundary>
    );
  }
}

ShiftCard.propTypes = {
  shiftData: shiftTypes.shift.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  recommendedRoleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf(['', 'booked']).isRequired
};

const mapStateToProps = state => {
  const { shifts } = state.shifts;
  return {
    shifts
  };
};

export default connect(mapStateToProps)(ShiftCard);
