import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';

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
  handleChange,
  handleBook,
  selected
}) => (
  <>
    <Row className="pb-2">
      {shiftData.repeated ? (
        <Col>
          This shift repeats until&nbsp;
          <strong>
            {moment(shiftData.repeated.untilDate, 'YYYY-MM-DD')
              .local()
              .format('dddd, MMMM Do YYYY')}
          </strong>
          .
        </Col>
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
          {repeatedType === '' || repeatedType === 'Never' ? null : (
            <Form.Group>
              <Form.Label>Until</Form.Label>
              {/* The user should not be able to select before today's date, and not after the end start of the repeating shift. */}
              <Form.Control
                type="date"
                name="until"
                value={until}
                onChange={handleChange}
                max={shiftData.repeated ? shiftData.repeated.untilDate : null}
                required
                min={shiftData.date}
              />
            </Form.Group>
          )}
          <Button
            variant="outline-success"
            type="button"
            disabled={shiftData.bookSuccess === true || selected === ''}
            onClick={() => handleBook(repeatedType, until)}
            style={{ marginLeft: 'auto' }}
            block
          >
            Book
          </Button>
        </Form>
      </Col>
    </Row>
  </>
);

export default RepeatBookingForm;
