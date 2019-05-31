import React from 'react';
import { Button, Badge, Popover, OverlayTrigger } from 'react-bootstrap';

const RoleBadge = ({ name, number, handleBook, booked }) => {
  const isBooked = booked === name;
  const value = isBooked ? parseInt(number, 10) - 1 : parseInt(number, 10);
  return (
    <OverlayTrigger
      trigger="focus"
      placement="right"
      overlay={
        <Popover>
          Booked!
          <span role="img" aria-label="Smiley face">
            😃
          </span>
        </Popover>
      }
    >
      <Button
        variant={isBooked ? 'success' : 'primary'}
        type="button"
        style={{
          textTransform: 'none',
          fontSize: '1rem'
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
    </OverlayTrigger>
  );
};

export default RoleBadge;
