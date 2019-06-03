import React from 'react';
import { Container, Form, Dropdown, DropdownButton } from 'react-bootstrap';

const options = [
  'Never',
  'Daily',
  'Week Days',
  'Weekends',
  'Weekly',
  'Monthly',
  'Annually'
];

const RepeatingShiftForm = props => {
  console.log();
  const { repeat, handleRepeatUntil } = props;
  let repeatUntil;
  if (repeat === undefined || repeat === 'Never') {
    repeatUntil = null;
  } else {
    repeatUntil = (
      <Form.Group>
        <Form.Label>Repeat Until</Form.Label>
        <Form.Control
          id="repeatUntil"
          name="repeatUntil"
          onChange={handleRepeatUntil}
          type="date"
          required
        />
      </Form.Group>
    );
  }
  return (
    <Container>
      <DropdownButton
        id="repeat-dropdown"
        title="Select repeat frequency"
        variant="outline-primary"
      >
        {options.map(op => (
          <Dropdown.Item
            id="repeat"
            eventKey={options.indexOf(op) + 1}
            as="button"
          >
            {op}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {repeatUntil}
    </Container>
  );
};

export default RepeatingShiftForm;
