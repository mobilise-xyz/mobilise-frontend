import React from 'react';
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import './ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from './ShiftCardModal/ShiftCardModal';
import RoleBadge from './ShiftCardModal/RoleBadge';

const formatTime = time =>
  moment(time, 'H:m:ss')
    .local()
    .format('h:mm a');

const generateRequirements = (shiftData, selected, isAdmin) =>
  shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0
    const { bookings } = r;
    return r.numberRequired > 0 ? (
      <>
        <RoleBadge
          isAdmin={isAdmin}
          name={r.role.name}
          selected={selected}
          colour={r.role.colour}
        />
        {isAdmin ? (
          <p>{r.numberRequired - bookings.length} SLOTS LEFT</p>
        ) : null}
      </>
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
    dispatch(shiftsActions.book(shiftData.id, selected, repeatedType, until));
  };

  render() {
    const { shiftData, clickable, isAdmin, recommendedRoleNames } = this.props;
    const { showModal, selected } = this.state;

    const expanded =
      shiftData.deleteSuccess === true || shiftData.bookSuccess === true;

    return (
      <ErrorBoundary>
        <Collapse in={!expanded}>
          <Card
            bg={expanded ? 'danger' : 'white'}
            style={{
              zIndex: 0
            }}
            className={recommendedRoleNames.length !== 0 ? 'bg-primary' : null}
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
              <Card.Text>
                <Row noGutters fluid>
                  <Col>{shiftData.address}</Col>
                  <Col>
                    {formatTime(shiftData.start)} - {formatTime(shiftData.stop)}
                  </Col>
                </Row>
                <Row noGutters fluid>
                  {generateRequirements(shiftData, selected, isAdmin)}
                </Row>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                type="button"
                onClick={this.toggleModal}
                disabled={shiftData.bookSuccess === true || clickable === false}
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
        </Collapse>
      </ErrorBoundary>
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
