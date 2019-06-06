import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminHeader = () => (
  <Nav className="mr-auto">
    <LinkContainer exact to="/">
      <Nav.Link>Shifts</Nav.Link>
    </LinkContainer>
  </Nav>
);

export default AdminHeader;
