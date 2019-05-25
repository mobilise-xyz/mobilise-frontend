import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer, NavLink } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from './logo.png';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar bg="light" expand="lg" variant="light">
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
              <LinkContainer exact={true} to="/" activeStyle={{ color: 'green' }}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer exact={true} to="/shifts" activeStyle={{ color: 'green' }}>
                <Nav.Link>Shifts</Nav.Link>
              </LinkContainer>
            </Nav>
            <NavDropdown
              alignRight={true}
              title={<FontAwesomeIcon icon={faBell} />}
              className="mr-sm-2 "
            >
              <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              alignRight={true}
              title={<FontAwesomeIcon icon={faCog} />}
              className="mr-sm-2"
            >
              <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
