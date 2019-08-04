import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

const DateTimeForm = ({ handleChange, date, startTime, endTime, noLabel }) => {
  return (
    <Form.Row>
      {/* Date */}
      <Form.Group as={Col}>
        {noLabel ? null : <Form.Label>Date</Form.Label>}
        <Form.Control
          id="date"
          name="date"
          onChange={handleChange}
          type="date"
          value={date}
          min={moment().format('YYYY-MM-DD')}
          placeholder="yyyy-mm-dd" // TODO(sonjoonho) test on Safari
          required
        />
      </Form.Group>
      {/* Time */}
      <Form.Group as={Col}>
        <Row>
          <Col>
            {noLabel ? null : <Form.Label>Start</Form.Label>}
            <Form.Control
              id="start-time"
              name="start"
              type="time"
              onChange={handleChange}
              value={startTime}
              placeholder="hh:mm" // TODO(sonjoonho) test on Safari
              required
            />
          </Col>
          <Col>
            {noLabel ? null : <Form.Label>End</Form.Label>}
            <Form.Control
              id="end-time"
              name="stop"
              type="time"
              onChange={handleChange}
              value={endTime}
              placeholder="hh:mm" // TODO(sonjoonho) test on Safari
              required
            />
          </Col>
        </Row>
      </Form.Group>
    </Form.Row>
  );
};

DateTimeForm.defaultProps = {
  noLabel: false
};

DateTimeForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  noLabel: PropTypes.bool
};

export default DateTimeForm;
