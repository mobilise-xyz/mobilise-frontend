import React from 'react';
import { Badge, Button } from 'react-bootstrap';

const VolunteerRoleBadge = ({
  name,
  number,
  handleSelect,
  selected,
  onModal = true,
  colour = 'info'
}) => {
  const isSelected = selected === name;
  const buttonColour = isSelected ? 'green' : colour;
  return (
    <Button
      style={{
        textTransform: 'none',
        fontSize: '1rem',
        backgroundColor: buttonColour,
        color: 'white'
      }}
      name={name}
      onClick={onModal ? handleSelect : null}
    >
      {name}
      {number ? (
        <Badge variant="light" style={{ marginLeft: '0.3rem' }}>
          {number}
        </Badge>
      ) : (
        number
      )}
    </Button>
  );
};

export default VolunteerRoleBadge;
