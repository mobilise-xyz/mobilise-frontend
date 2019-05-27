import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from '../../assets/images/logo.png';

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

      <Navbar.Text className="mr-sm-2">
        Logged in as [User] (Volunteer)
      </Navbar.Text>
      {/* Notifications dropdown */}
      <NavDropdown
        alignRight
        title={<FontAwesomeIcon icon={faBell} />}
        className="mr-sm-2 "
      >
        <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>
      </NavDropdown>
      {/* Settings dropdown */}
      <NavDropdown
        alignRight
        title={<FontAwesomeIcon icon={faCog} />}
        className="mr-sm-2"
      >
        <LinkContainer to="profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="settings">
          <NavDropdown.Item>Settings</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="feedback">
          <NavDropdown.Item>Give Feedback</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to="login">
          <NavDropdown.Item>Sign out</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
