import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const VolunteerHeader = () => (
  <Nav className="mr-auto">
    <LinkContainer exact to="/">
      <Nav.Link>Shifts</Nav.Link>
    </LinkContainer>
    <LinkContainer exact to="/shifts">
      <Nav.Link>My Shifts</Nav.Link>
    </LinkContainer>
    <LinkContainer exact to="/calendar">
      <Nav.Link>Calendar</Nav.Link>
    </LinkContainer>
    <LinkContainer exact to="/dashboard">
      <Nav.Link>Dashboard</Nav.Link>
    </LinkContainer>
  </Nav>
);

export default VolunteerHeader;
