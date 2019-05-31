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
  'Weekly',
  'Monthly',
  'Annually',
  'Custom'
];

const RepeatingShiftForm = props => {
  const { repeat, handleChange, handleRepeatUntil } = props;
  let repeatUntil;
  if (repeat !== 1) {
    // TODO: don't hardcode this.
    console.log(repeat);
    repeatUntil = (
      <Container>
        <Form.Label>Repeat Until</Form.Label>
        <Form.Control
          id="repeat-until-date"
          name="repeat-until-date"
          onChange={handleRepeatUntil}
          type="date"
          required
        />
      </Container>
    );
  } else {
    repeatUntil = null;
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
          defaultValue={1}
          onChange={handleChange}
        >
          {options.map(op => (
            <ToggleButton
              id="repeat"
              variant="primary"
              type="radio"
              key={options.indexOf(op) + 1}
              value={options.indexOf(op) + 1}
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
