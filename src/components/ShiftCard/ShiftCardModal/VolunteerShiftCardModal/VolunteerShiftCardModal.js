import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../ShiftCard.css';
import utils from '../../../../_helpers/utils';
import BookingPane from './BookingPane';
import CancelPane from './CancelPane';
import { shiftStatus } from '../../../Shift';

class VolunteerShiftCardModal extends React.Component {
  state = {
    repeatedType: '',
    until: '',
    showMore: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  toggleShowMore = () => {
    const { showMore } = this.state;
    this.setState({ showMore: !showMore });
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
    const { repeatedType, until, showMore } = this.state;

    const booked = type === shiftStatus.BOOKED;

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
                  <i className="material-icons">calendar_today</i>
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
                  <i className="material-icons">location_on</i>
                </Col>
                <Col>{shiftData.address}</Col>
              </Row>
              <Row className="pb-2">
                <Col xs={1} className="icon-col">
                  <i className="material-icons">perm_contact_calendar</i>
                </Col>
                <Col>
                  {`${shiftData.creator.user.firstName} ${shiftData.creator.user.lastName} `}
                  (
                  <a href={`mailto:${shiftData.creator.user.email}`}>
                    {shiftData.creator.user.email})
                  </a>
                </Col>
              </Row>
              <Row className="pb-4">
                <Col xs={1} className="icon-col">
                  <i className="material-icons">info</i>
                </Col>
                <Col>
                  {shiftData.description.length > 50 ? (
                    <>
                      <p style={{ marginBottom: 0 }}>
                        {showMore
                          ? shiftData.description
                          : `${shiftData.description.substring(0, 50)}...`}
                      </p>
                      <Button
                        className="btn btn-link"
                        style={{
                          textTransform: 'none',
                          padding: 0
                        }}
                        onClick={this.toggleShowMore}
                      >
                        {!showMore ? 'More' : 'Less'}
                      </Button>
                    </>
                  ) : (
                    <p>{shiftData.description}</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              {booked ? (
                <CancelPane
                  onHide={onHide}
                  requirements={shiftData.requirements}
                  id={shiftData.id}
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
