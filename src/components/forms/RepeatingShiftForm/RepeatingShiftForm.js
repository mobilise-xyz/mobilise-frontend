import React from 'react';
import {
<<<<<<< HEAD
  Container,
=======
>>>>>>> Implement Repeating shift form.
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

<<<<<<< HEAD
const RepeatingShiftForm = props => {
  const { repeat, handleChange, handleRepeatUntil } = props;
  let repeatUntil;
  if (repeat === undefined || repeat === 'Never') {
    // TODO: don't hardcode this.
    repeatUntil = null;
  } else {
    repeatUntil = (
      <Form.Group>
        <Form.Label>Repeat Until</Form.Label>
        <Form.Control
          id="repeat-until-date"
          name="repeat-until-date"
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
=======
const RepeatingShiftForm = () => {
  return (
    <Form.Group>
      <Form.Label>Repeat</Form.Label>
      <Form.Check type="radio">
        <ButtonToolbar
          className="mb-3"
          aria-label="Button Toolbar for selecting shift repetition"
        >
          <ToggleButtonGroup
            className="mr-2"
            type="radio"
            name="options"
            defaultValue={1}
          >
            {options.map(op => (
              <ToggleButton
                variant="primary"
                type="radio"
                value={options.indexOf(op) + 1}
              >
                {op}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ButtonToolbar>
      </Form.Check>
    </Form.Group>
>>>>>>> Implement Repeating shift form.
  );
};

export default RepeatingShiftForm;
