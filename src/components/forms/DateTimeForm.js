import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

const DateTimeForm = ({ handleChange, date, startTime, endTime }) => {
  return (
    <Form.Row>
      {/* Date */}
      <Form.Group as={Col}>
        <Form.Label>Date</Form.Label>
        <Form.Control
          id="date"
          name="date"
          onChange={handleChange}
          type="date"
          value={date}
          min={moment().format('YYYY-MM-DD')}
          required
        />
      </Form.Group>
      {/* Time */}
      <Form.Group as={Col}>
        <Row>
          <Col>
            <Form.Label>Start</Form.Label>
            <Form.Control
              id="start-time"
              name="start"
              type="time"
              onChange={handleChange}
              value={startTime}
              required
            />
          </Col>
          <Col>
            <Form.Label>End</Form.Label>
            <Form.Control
              id="end-time"
              name="stop"
              type="time"
              onChange={handleChange}
              value={endTime}
              required
            />
          </Col>
        </Row>
      </Form.Group>
    </Form.Row>
  );
};

DateTimeForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
};

export default DateTimeForm;
