import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import './ShiftCard.css';
import shiftActions from '../../_actions/shift.actions';
import ShiftCardModal from './ShiftCardModal';

// shiftData consists of title, description, date, start, stop, address

class ShiftCard extends React.Component {
  state = {
    showModal: false,
    booked: '',
    deleted: false
  };

  toggleModal = () => this.setState(state => ({ showModal: !state.showModal }));

  handleDelete = () => {
    // Hide the modal
    this.toggleModal();

    // Perform deletion
    const { shiftData, dispatch } = this.props;
    const shiftId = shiftData.id;
    dispatch(shiftActions.deleteWithId(shiftId));
    this.setState({ deleted: true });
  };

  handleBook = e => {
    const { name, value } = e.target;

    const { booked } = this.state;

    // TODO book and unbook requests.
    if (name === booked) {
      const newValue = parseInt(value, 10) + 1;
      // Already booked, unbook and fire unbook toast.
      this.setState({
        booked: ''
      });
      // Book
      console.log('Post', newValue);
    } else {
      const newValue = parseInt(value, 10) - 1;
      // Not already booked, book and fire book toast.
      this.setState({
        booked: name
      });
      // Unbook
      console.log('Post', newValue);
    }
  };

  render() {
    const { shiftData } = this.props;
    const {
      showModal,
      booked,
      showBookedOverlay,
      showUnbookedOverlay,
      deleted
    } = this.state;

    return (
      <Collapse in={!deleted}>
        <Card
          title={shiftData.title}
          bg={deleted ? 'danger' : 'light'}
          style={{ width: '100%', margin: 'auto' }}
        >
          <Card.Body>
            <Card.Title>{shiftData.title}</Card.Title>
            {shiftData.description}
          </Card.Body>
          <button
            type="button"
            onClick={this.toggleModal}
            className="stretched-link shift-card-btn"
          >
            <span className="sr-only">Card infomation button</span>
          </button>

          <ShiftCardModal
            shiftData={shiftData}
            show={showModal}
            onHide={this.toggleModal}
            handleBook={this.handleBook}
            booked={booked}
            showBookedOverlay={showBookedOverlay}
            showUnbookedOverlay={showUnbookedOverlay}
            handleDelete={this.handleDelete}
          />
        </Card>
      </Collapse>
    );
  }
}

function mapStateToProps(state) {
  const { shift } = state;
  return {
    shift
  };
}

export default connect(mapStateToProps)(ShiftCard);
