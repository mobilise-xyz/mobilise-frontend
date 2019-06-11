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
      className="role-badge"
      style={{
        backgroundColor: colour,
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

CardRoleBadge.propTypes = {};

export default CardRoleBadge;
