import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../../assets/images/logo.png';
import CHLogo from '../CHLogo';

const WelcomeHeader = () => {
  return (
    <Navbar
      variant="light"
      bg="white"
      expand="lg"
      sticky="top"
      style={{ zIndex: 2000 }}
    >
      <Navbar.Brand>
        <img
          src={logo}
          width="100"
          alt="Mobilise logo"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <CHLogo colour="green" />
      </Nav>
    </Navbar>
  );
};

export default WelcomeHeader;
