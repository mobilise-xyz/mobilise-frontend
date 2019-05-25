import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from './logo.png';

const Header = () => (
  <Navbar bg="light" expand="lg">
    <LinkContainer to="/">
      <Navbar.Brand>
        <img
          src={logo}
          width="100"
          alt="Mobilise logo"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer exact to="/" activeStyle={{ color: 'green' }}>
          <Nav.Link>Shifts</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/shifts" activeStyle={{ color: 'green' }}>
          <Nav.Link>My Shifts</Nav.Link>
        </LinkContainer>
      </Nav>
      <NavDropdown
        alignRight
        title={<FontAwesomeIcon icon={faBell} />}
        className="mr-sm-2 "
      >
        <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        alignRight
        title={<FontAwesomeIcon icon={faCog} />}
        className="mr-sm-2"
      >
        <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>
      </NavDropdown>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
