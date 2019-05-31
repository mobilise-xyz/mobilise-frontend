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
  );
};

export default RepeatingShiftForm;
