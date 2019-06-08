import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import '../ModalRoleBadge/RoleBadge.css';

const VolunteerRoleBadge = ({
  name,
  number,
  handleSelect,
  selected,
  onModal = true,
  colour = 'info'
}) => {
  const isSelected = selected === name;
  const buttonColour = isSelected ? '#299688' : colour;
  return (
    <Button
      className="role-badge"
      style={{
        backgroundColor: buttonColour,
        padding: '0.01rem 0.8rem 0.01rem 0.8rem'
      }}
      name={name}
      onClick={onModal ? handleSelect : null}
    >
      {name}
      {number ? <Badge variant="light">{number}</Badge> : number}
    </Button>
  );
};

export default VolunteerRoleBadge;
