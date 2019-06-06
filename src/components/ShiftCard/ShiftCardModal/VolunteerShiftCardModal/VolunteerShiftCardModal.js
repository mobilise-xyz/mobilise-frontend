import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import RoleBadge from '../RoleBadge';
import '../../ShiftCard.css';

const getRepeatOptions = repeatedType => {
  switch (repeatedType) {
    case 'Daily':
      return [
        'Never',
        'Daily',
        'Weekends',
        'Weekdays',
        'Weekly',
        'Monthly',
        'Annually'
      ];
    case 'Weekly':
      return ['Never', 'Weekly'];
    case 'Monthly':
      return ['Never', 'Monthly', 'Annually'];
    case 'Weekends':
      return ['Never', 'Weekends', 'Weekly'];
    case 'Weekdays':
      return ['Never', 'Weekdays', 'Weekly'];
    default:
      console.log('Unknown repeated type:', repeatedType);
      return [];
  }
};

// This component is for users to book repeating shifts. It is only shown if the shift is repeating.
const RepeatBookingForm = ({
  shiftData,
  repeatedType,
  until,
  handleChange
}) => (
  <>
    <Row>
      {shiftData.repeated ? (
        <p>
          This shift repeats until&nbsp;
          <strong>
            {moment(shiftData.repeated.untilDate, 'YYYY-MM-DD')
              .local()
              .format('dddd, MMMM Do YYYY')}
          </strong>
          .
        </p>
      ) : null}
    </Row>
    <Row>
      <Col>
        <h6>Book repeating?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form id="bookingform">
          <Form.Group>
            <Form.Label>Repeat frequency</Form.Label>
            {/* Only enable this form if repeatedId is not null. */}
            <Form.Control
              as="select"
              name="repeatedType"
              value={repeatedType}
              onChange={handleChange}
              required
            >
              {shiftData.repeated
                ? getRepeatOptions(shiftData.repeated.type).map(option => (
                    <option key={`${shiftData.id}-option-${option}`}>
                      {option}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Form.Group>
          {repeatedType !== 'Never' ? (
            <Form.Group>
              <Form.Label>Until</Form.Label>
              {/* The user should not be able to select before today's date, and not after the end start of the repeating shift. */}
              <Form.Control
                type="date"
                name="until"
                min={moment().format('YYYY-MM-DD')}
                value={until}
                onChange={handleChange}
                max={shiftData.repeated ? shiftData.repeated.untilDate : null}
                required
              />
            </Form.Group>
          ) : null}
        </Form>
      </Col>
    </Row>
  </>
);

class VolunteerShiftCardModal extends React.Component {
  state = {
    repeatedType: '',
    until: ''
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
      selected
    } = this.props;
    const { repeatedType, until } = this.state;
    const shiftRepeats = shiftData.repeatedId !== null;

    const repeatForm = shiftRepeats ? (
      <RepeatBookingForm
        shiftData={shiftData}
        repeatedType={repeatedType}
        until={until}
        handleChange={this.handleChange}
      />
    ) : null;

    return (
      <Modal show={show} onHide={() => onHide(false)} size="lg" centered>
        <Modal.Header>
          <Modal.Title>{shiftData.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h6>Description</h6>
                  {shiftData.description}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Date</h6>
                  {moment(shiftData.date, 'YYYY-MM-DD').format('LL')}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Time</h6>
                  {moment(shiftData.start, 'H:m:ss')
                    .local()
                    .format('h:mm a')}{' '}
                  -
                  {moment(shiftData.stop, 'H:m:ss')
                    .local()
                    .format('h:mm a')}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Managed by</h6>
                  {`${shiftData.creator.user.firstName} ${
                    shiftData.creator.user.lastName
                  }`}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Location</h6>
                  {shiftData.address}
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h6>Choose a role to book</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  {shiftData.requirements.map(r => {
                    // Only show roles that are available to book
                    // i.e. numberRequired > 0
                    return r.numberRequired > 0 ? (
                      <RoleBadge
                        key={shiftData.id + r.role.name}
                        name={r.role.name}
                        handleSelect={handleSelect}
                        selected={selected}
                        onModal
                        colour={r.role.colour}
                      />
                    ) : null;
                  })}
                </Col>
              </Row>
              {repeatForm}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem'
          }}
        >
          <Button
            variant="outline-secondary"
            onClick={() => onHide(false)}
            form="bookingform"
          >
            Close
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            disabled={shiftData.bookSuccess === true || selected === ''}
            onClick={() => handleBook(repeatedType, until)}
          >
            Book
          </Button>
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
