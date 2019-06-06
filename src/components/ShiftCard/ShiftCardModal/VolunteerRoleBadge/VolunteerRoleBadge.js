import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import '../RoleBadge.css';

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
      className="role-badge"
      style={{ backgroundColor: buttonColour }}
      name={name}
      onClick={onModal ? handleSelect : null}
    >
      {name}
      {number ? <Badge variant="light">{number}</Badge> : number}
    </Button>
  );
};

export default VolunteerRoleBadge;
