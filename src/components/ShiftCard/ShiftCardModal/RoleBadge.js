import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const RoleBadge = ({
  name,
  number,
  handleSelect,
  selected,
  clickable = true,
  colour = 'info'
}) => {
  const isSelected = selected === name;
  return (
    <Button
      variant={isSelected ? 'success btn-raised' : 'primary btn-raised'}
      type="button"
      style={{
        textTransform: 'none',
        fontSize: '1rem',
        padding: '0.3rem',
        marginLeft: '0.3125rem',
        backgroundColor: colour
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
