import React from 'react';
import {
  Container,
  Form,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';

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
  const { repeat, handleChange, handleRepeatUntil } = props;
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
      <ButtonToolbar
        className="justify-content-md-center"
        name="repeat"
        aria-label="Button Toolbar for selecting shift repetition"
      >
        <ToggleButtonGroup
          className="mr-2"
          name="repeat-options"
          type="radio"
          defaultValue="Never"
          onChange={handleChange}
        >
          {options.map(op => (
            <ToggleButton
              id="repeat"
              variant="primary"
              type="radio"
              key={options.indexOf(op) + 1}
              value={op}
            >
              {op}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </ButtonToolbar>
      {repeatUntil}
    </Container>
  );
};

export default RepeatingShiftForm;
