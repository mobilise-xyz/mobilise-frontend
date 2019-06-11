import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import utils from '../../_helpers/utils';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from './ShiftCardModal/ShiftCardModal';
import CardRoleBadge from './RoleBadges/CardRoleBadge';
import shiftTypes from '../../__types/shifts.types';

const generateRequirements = (shiftData, selected, isAdmin) =>
  shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0

    const { numberRequired, role, bookings } = r;
    const numberOfBookings = bookings ? bookings.length : 0;
    const numberRemaining = numberRequired - numberOfBookings; // TODO hook up
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

    const thisShift = shifts.all.find(s => s.id === shiftData.id);

    const collapsed =
      thisShift.deleteSuccess === true || thisShift.bookSuccess === true;

    const isRecommended = recommendedRoleNames.length !== 0;

    return (
      <ErrorBoundary>
        <Card
          bg={collapsed ? 'danger' : 'white'}
          style={{
            zIndex: 0
          }}
        >
          <a
            href={generateGoogleMapsLink(shiftData.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card.Img
              variant="top"
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
              {generateRequirements(shiftData, selected, isAdmin)}
            </Row>
          </Card.Body>
          <Card.Footer className={isRecommended ? 'bg-primary' : null}>
            <Button
              type="button"
              onClick={this.toggleModal}
              disabled={collapsed}
              className={`btn-more-info ${
                isRecommended ? 'btn-recommended' : null
              }`}
            >
              More info
              <span className="sr-only">Card information button</span>
            </Button>
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

function mapStateToProps(state) {
  const { shifts } = state.shifts;
  return {
    shifts
  };
}

export default connect(mapStateToProps)(ShiftCard);
