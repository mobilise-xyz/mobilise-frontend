import React from 'react';
import { Badge, Button } from 'react-bootstrap';

const RoleBadge = ({
  name,
  number,
  handleSelect,
  selected,
  clickable = true,
  colour = 'info'
}) => {
  const isSelected = selected === name;
  const buttonColour = isSelected ? 'green' : colour;
  return (
    <Button
      type="button"
      style={{
        textTransform: 'none',
        fontSize: '1rem',
        padding: '0.3rem',
        marginLeft: '0.3125rem',
        backgroundColor: buttonColour,
        color: 'white'
      }}
      name={name}
      onClick={clickable ? handleSelect : null}
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

export default RoleBadge;
