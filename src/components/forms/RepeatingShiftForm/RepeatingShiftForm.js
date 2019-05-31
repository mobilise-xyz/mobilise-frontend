import React from 'react';
import {
  Container,
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
  const { handleChange } = props;
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
    </Container>
  );
};

export default RepeatingShiftForm;
