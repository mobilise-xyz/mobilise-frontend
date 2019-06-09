import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';

const DateTimeForm = ({ handleChange, date }) => {
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
              name="startTime"
              type="time"
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>End</Form.Label>
            <Form.Control
              id="end-time"
              name="endTime"
              type="time"
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </Form.Group>
    </Form.Row>
  );
};

export default DateTimeForm;
