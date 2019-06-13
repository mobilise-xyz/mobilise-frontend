import React from 'react';
import { Badge } from 'react-bootstrap';
import '../ModalRoleBadge/RoleBadge.css';

const CardRoleBadge = ({
  name,
  number,
  handleSelect,
  onModal = true,
  colour = 'info'
}) => {
  return (
    <Badge
      pill
      className="role-badge"
      style={{
        backgroundColor: colour,
        padding: '0.1rem 0.7rem'
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

export default CardRoleBadge;
