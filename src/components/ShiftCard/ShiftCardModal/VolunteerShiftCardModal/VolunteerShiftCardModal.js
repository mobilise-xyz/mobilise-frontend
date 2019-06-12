import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faCalendarAlt,
  faInfoCircle,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import '../../ShiftCard.css';
import utils from '../../../../_helpers/utils';
import BookingPane from './BookingPane';
import CancelPane from './CancelPane';

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
      selected,
      type
    } = this.props;
    const { repeatedType, until, reason } = this.state;

    const booked = type === 'booked';

    return (
      <Modal show={show} onHide={() => onHide(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{shiftData.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={12}>
              <Row className="pb-2" noGutters>
                <Col xs={1} className="icon-col">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </Col>
                <Col>
                  {utils.formatDate(shiftData.date)}{' '}
                  <span className="text-muted">at</span>{' '}
                  {utils.formatTime(shiftData.start)}{' '}
                  <span className="text-muted">to</span>{' '}
                  {utils.formatTime(shiftData.stop)}
                </Col>
              </Row>
              <Row className="pb-2" noGutters>
                <Col xs={1} className="icon-col">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </Col>
                <Col>{shiftData.address}</Col>
              </Row>
              <Row className="pb-2">
                <Col xs={1} className="icon-col">
                  <FontAwesomeIcon icon={faAddressCard} />
                </Col>
                <Col>
                  {`${shiftData.creator.user.firstName} ${
                    shiftData.creator.user.lastName
                  } `}
                  (
                  <a href={`mailto:${shiftData.creator.user.email}`}>
                    {shiftData.creator.user.email})
                  </a>
                </Col>
              </Row>
              <Row className="pb-4">
                <Col xs={1} className="icon-col">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Col>
                <Col>{shiftData.description}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              {booked ? (
                <CancelPane
                  shiftData={shiftData}
                  handleChange={this.handleChange}
                  onHide={onHide}
                  cancelReason={reason}
                />
              ) : (
                <BookingPane
                  handleSelect={handleSelect}
                  shiftData={shiftData}
                  repeatedType={repeatedType}
                  until={until}
                  handleChange={this.handleChange}
                  selected={selected}
                  handleBook={handleBook}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
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
