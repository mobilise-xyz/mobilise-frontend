import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../ShiftCard/ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from '../ShiftCard/ShiftCardModal/ShiftCardModal';
import shiftTypes from '../../__types/shifts.types';

export const shiftStatus = {
  NONE: 'NONE',
  BOOKED: 'BOOKED'
};

class Shift extends React.Component {
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
      recommendedRoleNames,
      type,
      isAdmin,
      renderer,
      // Redux props
      shifts,
      myShifts
    } = this.props;
    const { showModal, selected } = this.state;

    let isDeleted = false;
    let isBooked = false;
    let isCancelled = false;
    let isRecommended = false;

    if (!isAdmin) {
      // Do not show if there are no available roles to book.
      const numberOfAvailableRoles = shiftData.requirements.filter(r => {
        const { numberRequired, bookings } = r;
        const numberOfBookings = bookings ? bookings.length : 0;
        const numberRemaining = numberRequired - numberOfBookings;
        return numberRemaining > 0;
      }).length;

      if (numberOfAvailableRoles < 1) {
        return null;
      }
    }

    if (type !== shiftStatus.BOOKED) {
      const thisShift = shifts.all.find(s => s.id === shiftData.id);

      isDeleted = thisShift.deleteSuccess === true;
      isBooked = thisShift.bookSuccess === true;
      isRecommended = recommendedRoleNames.length > 0;
    } else {
      const thisShift = myShifts.all.find(s => s.id === shiftData.id);

      isCancelled = thisShift.cancelSuccess === true;
    }

    const rendererProps = {
      toggleModal: this.toggleModal,
      recommendedRoleNames,
      isRecommended,
      isAdmin,
      isDeleted,
      isBooked,
      isCancelled,
      type,
      shiftData
    };

    const RenderedComponent = renderer(rendererProps);

    return (
      <ErrorBoundary>
        {RenderedComponent}
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
      </ErrorBoundary>
    );
  }
}

Shift.propTypes = {
  shiftData: shiftTypes.shift.isRequired,
  recommendedRoleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf([shiftStatus.NONE, shiftStatus.BOOKED]).isRequired,
  renderer: PropTypes.elementType.isRequired
};

const mapStateToProps = state => {
  const { shifts, myShifts } = state.shifts;
  return {
    shifts,
    myShifts
  };
};

export default connect(mapStateToProps)(Shift);
