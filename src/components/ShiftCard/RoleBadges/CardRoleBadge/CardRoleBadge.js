import React from 'react';
import { Badge } from 'react-bootstrap';
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
  const buttonColour = isSelected ? 'white' : colour;
  return (
    <Badge
      className="role-badge"
      style={{
        backgroundColor: buttonColour,
        padding: '0.01rem 0.5rem 0.01rem 0.5rem'
      }}
      name={name}
      onClick={onModal ? handleSelect : null}
    >
      {name}
      {number ? (
        <Badge variant="light" style={{ margin: '0.3rem' }}>
          {number}
        </Badge>
      ) : null}
    </Badge>
  );
};

VolunteerRoleBadge.propTypes = {};

export default VolunteerRoleBadge;
