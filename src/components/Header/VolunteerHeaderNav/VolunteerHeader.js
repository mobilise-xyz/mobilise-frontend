import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const VolunteerHeader = () => (
  <Nav className="mr-auto">
    <LinkContainer exact to="/" activeStyle={{ color: 'green' }}>
      <Nav.Link>Shifts</Nav.Link>
    </LinkContainer>
    <LinkContainer exact to="/shifts" activeStyle={{ color: 'green' }}>
      <Nav.Link>My Shifts</Nav.Link>
    </LinkContainer>
  </Nav>
);

export default VolunteerHeader;
