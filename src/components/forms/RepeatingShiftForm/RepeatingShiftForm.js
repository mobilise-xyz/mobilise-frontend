import React from 'react';
import { Form } from 'react-bootstrap';

const options = [
  'Never',
  'Daily',
  'Weekdays',
  'Weekends',
  'Weekly',
  'Monthly',
  'Annually'
];

const RepeatingShiftForm = ({ repeat, handleChange }) => {
  let repeatUntil;
  if (repeat === undefined || repeat === 'Never') {
    repeatUntil = null;
  } else {
    repeatUntil = (
      <Form.Group>
        <Form.Label>Repeat Until</Form.Label>
        <Form.Control
          id="repeat-until-date"
          name="repeatUntil"
          onChange={handleChange}
          type="date"
          required
        />
      </Form.Group>
    );
  }
  return (
    <Form.Group>
      <Form.Group>
        <Form.Label>Repeat</Form.Label>
        <Form.Control
          id="repeat-dropdown"
          name="repeat"
          as="select"
          value={repeat}
          onChange={handleChange}
        >
          {options.map(op => (
            <option key={op}>{op}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {repeatUntil}
    </Form.Group>
  );
};

export default RepeatingShiftForm;
