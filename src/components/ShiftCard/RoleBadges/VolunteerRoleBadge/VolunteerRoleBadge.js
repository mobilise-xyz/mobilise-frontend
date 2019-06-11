import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import '../ModalRoleBadge/RoleBadge.css';

// This badge goes on the Volunteer Modal.
const VolunteerRoleBadge = ({
  name,
  number,
  handleSelect,
  selected,
  onModal = true,
  colour = 'info'
}) => {
  const isSelected = selected === name;
  return (
    <Button
      className="role-badge"
      style={{
        backgroundColor: isSelected ? colour : 'LightGray',
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
