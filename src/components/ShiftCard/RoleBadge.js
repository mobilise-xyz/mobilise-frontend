import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const RoleBadge = ({ name, number }) => (
  <Button variant="primary" style={{ textTransform: 'none' }}>
    {name}
    <Badge variant="light" style={{ marginLeft: '0.5rem' }}>
      {number}
    </Badge>
  </Button>
);

export default RoleBadge;
