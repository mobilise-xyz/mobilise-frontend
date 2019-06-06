import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../RoleBadge.css';

const AdminRoleBadge = ({
  name,
  number,
  handleUpdate,
  onModal = true,
  colour = 'info'
}) => {
  const decBtn = onModal ? (
    <Button onClick={() => handleUpdate(name, number - 1)}>
      {<FontAwesomeIcon icon={faMinus} color="white" />}
    </Button>
  ) : null;
  const incBtn = onModal ? (
    <Button onClick={() => handleUpdate(name, number + 1)}>
      {<FontAwesomeIcon icon={faPlus} color="white" />}
    </Button>
  ) : null;
  return (
    <Badge
      className="role-badge"
      style={{ backgroundColor: colour }}
      name={name}
    >
      {name}
      {decBtn}
      {number ? (
        <Badge variant="light" className="number-badge">
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
