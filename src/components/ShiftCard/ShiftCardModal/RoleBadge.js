import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const RoleBadge = ({ name, number, handleBook, booked }) => {
  const isBooked = booked === name;
  const value = isBooked ? parseInt(number, 10) - 1 : parseInt(number, 10);
  return (
    <Button
      variant={isBooked ? 'success btn-raised' : 'primary btn-raised'}
      type="button"
      style={{
        textTransform: 'none',
        fontSize: '1rem',
        padding: '0.3rem',
        marginLeft: '0.3125rem',
        backgroundColor: 'info'
      }}
      name={name}
      value={value}
      onClick={handleBook}
    >
      {name}
      <Badge variant="light" style={{ marginLeft: '0.3rem' }}>
        {value}
      </Badge>
    </Button>
  );
};

export default RoleBadge;
