import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../ShiftCard.css';
import utils from '../../../../_helpers/utils';
import BookingRightPane from './BookingRightPane';
import CancelRightPane from './CancelRightPane';

class VolunteerShiftCardModal extends React.Component {
  state = {
    repeatedType: '',
    until: '',
    reason: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      shiftData,
      onHide,
      show,
      handleSelect,
      handleBook,
      // handleCancelBooking,
      selected,
      type
    } = this.props;
    const { repeatedType, until, reason } = this.state;

    const booked = type === 'booked';

    return (
      <Modal show={show} onHide={() => onHide(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{shiftData.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col className="info">
                  <h6>Description</h6>
                  {shiftData.description}
                </Col>
              </Row>
              <Row>
                <Col className="info">
                  <h6>Date</h6>
                  {moment(shiftData.date, 'YYYY-MM-DD').format('LL')}
                </Col>
              </Row>
              <Row>
                <Col className="info">
                  <h6>Time</h6>
                  {utils.formatTime(shiftData.start)} -{' '}
                  {utils.formatTime(shiftData.stop)}
                </Col>
              </Row>
              <Row>
                <Col className="info">
                  <h6>Managed by</h6>
                  {`${shiftData.creator.user.firstName} ${
                    shiftData.creator.user.lastName
                  }`}
                </Col>
              </Row>
              <Row>
                <Col className="info">
                  <h6>Location</h6>
                  {shiftData.address}
                </Col>
              </Row>
            </Col>
            <Col>
              {booked ? (
                <CancelRightPane
                  shiftData={shiftData}
                  handleChange={this.handleChange}
                  onHide={onHide}
                  cancelReason={reason}
                />
              ) : (
                <BookingRightPane
                  handleSelect={handleSelect}
                  shiftData={shiftData}
                  repeatedType={repeatedType}
                  until={until}
                  handleChange={this.handleChange}
                  selected={selected}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {!booked ? (
            <Button
              variant="outline-primary"
              type="submit"
              disabled={shiftData.bookSuccess === true || selected === ''}
              onClick={() => handleBook(repeatedType, until)}
              style={{ marginLeft: 'auto' }}
            >
              Book
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { shift } = state;
  return {
    shift
  };
}

export default connect(mapStateToProps)(VolunteerShiftCardModal);
