import React from 'react';
import {
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

const RepeatingShiftForm = () => {
  return (
    <Form.Check type="radio">
      <Form.Label>Repeat</Form.Label>
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
  );
};

export default RepeatingShiftForm;
