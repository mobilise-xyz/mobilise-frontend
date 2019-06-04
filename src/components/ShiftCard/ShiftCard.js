import React from 'react';
import { Card, Col, Collapse, Row } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import './ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from './ShiftCardModal/ShiftCardModal';
import RoleBadge from './ShiftCardModal/RoleBadge';

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

  render() {
    const { shiftData, isAdmin } = this.props;
    const { showModal, selected } = this.state;
    const deleted = shiftData.deleteSuccess === true;

    return (
      <ErrorBoundary>
        <Collapse in={!deleted}>
          <Card
            title={shiftData.title}
            bg={deleted ? 'danger' : 'light'}
            style={{ width: '100%', margin: 'auto', zIndex: 0 }}
          >
            <Card.Body>
              <Row />
              <Row>
                <Col>
                  <h6>Location</h6>
                  <p>{shiftData.address}</p>
                </Col>
                <Col>
                  <h6>Description</h6>
                  <p>{shiftData.description}</p>
                </Col>
                <Col>
                  <h6>Available roles</h6>
                  <Row>
                    {shiftData.requirements.map(r => {
                      // Only show roles that are available to book
                      // i.e. numberRequired > 0
                      return r.numberRequired > 0 ? (
                        <RoleBadge
                          key={shiftData.id + r.role.name}
                          name={r.role.name}
                          colour={r.role.colour}
                          selected={selected}
                        />
                      ) : null;
                    })}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Date</h6>
                  <p>
                    {moment(shiftData.date)
                      .local()
                      .format('dddd, MMMM Do YYYY')}
                  </p>
                  {shiftData.repeatedId ? (
                    <p className="text-muted">Repeating</p>
                  ) : null}
                </Col>
                <Col>
                  <Row noGutters>
                    <Col>
                      <h6>Start time</h6>
                      <p>
                        {moment(shiftData.start, 'H:m:ss')
                          .local()
                          .format('h:mm a')}
                      </p>
                    </Col>
                    <Col>
                      <h6>End time</h6>
                      <p>
                        {moment(shiftData.stop, 'H:m:ss')
                          .local()
                          .format('h:mm a')}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <h6>Managed by</h6>
                  <p>{`${shiftData.creator.user.firstName} ${
                    shiftData.creator.user.lastName
                  }`}</p>
                </Col>
              </Row>
            </Card.Body>
            <button
              type="button"
              onClick={this.toggleModal}
              className="stretched-link shift-card-btn"
              disabled={shiftData.bookSuccess === true}
            >
              <span className="sr-only">Card information button</span>
            </button>
            <ShiftCardModal
              isAdmin={isAdmin}
              shiftData={shiftData}
              show={showModal}
              onHide={this.toggleModal}
              handleSelect={this.handleSelect}
              selected={selected}
              handleDelete={this.handleDelete}
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
