import React from 'react';
import { Image, Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../../assets/images/logo.png';
import chlogo from '../../../assets/images/CH-Logo-g.png';

const entryPoints = ['/login', '/signup'];

const WelcomeHeader = location => {
  const cityHarvestBtn = (
    <Button onClick={() => window.open('http://www.cityharvest.org.uk/')}>
      <Image
        src={chlogo}
        height="50"
        alt="City Harvest London"
        className="d-inline-block align-top"
        rounded
      />
    </Button>
  );

  const loginSignUpBtns = entryPoints.includes(location.location.pathname) ? (
    <Nav>
      <LinkContainer to="signup">
        <Button>Sign Up</Button>
      </LinkContainer>
      <LinkContainer to="login">
        <Button>Log in</Button>
      </LinkContainer>
    </Nav>
  ) : null;

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
      <Nav className="mr-auto">{cityHarvestBtn}</Nav>
      {loginSignUpBtns}
    </Navbar>
  );
};

export default WelcomeHeader;
