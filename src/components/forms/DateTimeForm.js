import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import moment from 'moment';

const DateTimeForm = props => {
  const { handleChange } = props;
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
