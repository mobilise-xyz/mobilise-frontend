import React from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../ModalRoleBadge/RoleBadge.css';
import './AdminRoleBadge.css';

const DecrementButton = ({ handleUpdate, name, number }) => (
  <Button
    className="role-control-button"
    onClick={() => handleUpdate(name, number - 1)}
  >
    {<FontAwesomeIcon icon={faMinus} color="white" />}
  </Button>
);

const IncrementButton = ({ handleUpdate, name, number }) => (
  <Button
    className="role-control-button"
    onClick={() => handleUpdate(name, number + 1)}
  >
    {<FontAwesomeIcon icon={faPlus} color="white" />}
  </Button>
);

const AdminRoleBadge = ({
  name,
  number,
  handleUpdate,
  onModal = true,
  colour = 'info'
}) => {
  return (
    <div>
      <Badge
        pill
        className="role-badge admin"
        style={{ padding: 0, backgroundColor: colour }}
        name={name}
      >
        {name}
        {onModal ? (
          <DecrementButton
            handleUpdate={handleUpdate}
            name={name}
            number={number}
          />
        ) : null}
        {number ? (
          <Badge variant="light" className="number-badge">
            {number}
          </Badge>
        ) : (
          number
        )}
        {onModal ? (
          <IncrementButton
            handleUpdate={handleUpdate}
            name={name}
            number={number}
          />
        ) : null}

        <div>
          <ListGroup>
            <ListGroup.Item>Hi</ListGroup.Item>
          </ListGroup>
        </div>
      </Badge>
    </div>
  );
};

export default AdminRoleBadge;
