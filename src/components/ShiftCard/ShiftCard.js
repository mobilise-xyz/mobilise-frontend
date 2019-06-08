import React from 'react';
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import './ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import utils from '../../_helpers/utils';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from './ShiftCardModal/ShiftCardModal';
import CardRoleBadge from './RoleBadges/CardRoleBadge';

const generateRequirements = (shiftData, selected, isAdmin) =>
  shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0
    const numberRemaining = r.numberRequired - 1; // TODO hook up
    return r.numberRequired > 0 ? (
      <CardRoleBadge
        isAdmin={isAdmin}
        name={r.role.name}
        selected={selected}
        colour={r.role.colour}
        number={numberRemaining}
        key={`role-badge-${shiftData.id}-${r.role.name}`}
      />
    ) : null;
  });

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

    // TODO book and unbook requests.
    if (name === selected) {
      // Already selected, select.
      this.setState({
        selected: ''
      });
      // Book
    } else {
      // Not already selected, select.
      this.setState({
        selected: name
      });
      // Unbook
    }
  };

  handleBook = (repeatedType, until) => {
    this.toggleModal();

    const { shiftData, dispatch } = this.props;
    const { selected } = this.state;

    if (selected === null) {
      console.log('THIS SHOULD BE AN ERROR'); // TODO
    }
    this.setState({ selected: '' });
    dispatch(shiftsActions.book(shiftData.id, selected, repeatedType, until));
  };

  render() {
    const {
      shiftData,
      clickable,
      isAdmin,
      recommendedRoleNames,
      shifts
    } = this.props;
    const { showModal, selected } = this.state;

    const thisShift = shifts.all.find(s => s.id === shiftData.id);

    const collapsed =
      thisShift.deleteSuccess === true || thisShift.bookSuccess === true;

    const isRecommended = recommendedRoleNames.length !== 0;

    return (
      <ErrorBoundary>
        <Collapse in={!collapsed}>
          <>
            <Card
              bg={collapsed ? 'danger' : 'white'}
              style={{
                zIndex: 0
              }}
            >
              <a
                href={`https://www.google.com/maps?safe=strict&q=${
                  shiftData.address
                }&um=1&ie=UTF-8&sa=X&ved=0ahUKEwiGr7nZxNXiAhXBUBUIHQq6DrQQ_AUIESgC`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card.Img
                  variant="top"
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                    shiftData.address
                  }&zoom=13&size=512x200&maptype=roadmap&markers=color:red%7C${
                    shiftData.address
                  }&&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                />
              </a>
              <Card.Body onClick={this.toggleModal}>
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
                  disabled={
                    shiftData.bookSuccess === true || clickable === false
                  }
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
              />
            </Card>
          </>
        </Collapse>
      </ErrorBoundary>
    );
  }
}

function mapStateToProps(state) {
  const { shifts } = state.shifts;
  return {
    shifts
  };
}

export default connect(mapStateToProps)(ShiftCard);
