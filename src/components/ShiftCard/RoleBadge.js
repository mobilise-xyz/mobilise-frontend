import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const RoleBadge = ({ name, number }) => (
  <Button
    variant="primary"
    type="button"
    style={{
      textTransform: 'none',
      fontSize: '1rem'
    }}
  >
    {name}
    <Badge variant="light" style={{ marginLeft: '0.3rem' }}>
      {number}
    </Badge>
  </Button>
);

export default RoleBadge;
