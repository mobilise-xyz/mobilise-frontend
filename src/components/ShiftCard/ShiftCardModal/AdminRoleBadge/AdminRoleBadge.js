import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminRoleBadge = ({ name, number, onModal = true, colour = 'info' }) => {
  const decBtn = onModal ? (
    <Button size="sm">{<FontAwesomeIcon icon={faMinus} />}</Button>
  ) : null;
  const incBtn = onModal ? (
    <Button size="sm">{<FontAwesomeIcon icon={faPlus} />}</Button>
  ) : null;
  return (
    <Badge
      style={{
        textTransform: 'none',
        fontSize: '1rem',
        backgroundColor: colour,
        color: 'white'
      }}
      name={name}
    >
      {name}
      {decBtn}
      {number ? (
        <Badge variant="light" style={{ marginLeft: '0.3rem' }}>
          {number}
        </Badge>
      ) : (
        number
      )}
      {incBtn}
    </Badge>
  );
};

export default AdminRoleBadge;
