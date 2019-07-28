import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../../assets/images/logo.png';

const WelcomeHeader = (homeBtn, homePage) => {
  const homeButton = homeBtn ? (
    <LinkContainer exact to="/home">
      <Button>
        <span style={{ margin: 'auto' }}>
          <FontAwesomeIcon className="small" icon={faHome} size="1x" />
        </span>
      </Button>
    </LinkContainer>
  ) : null;

  const loginSignUpBtns = homePage ? (
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
      <Nav className="mr-auto">{homeButton}</Nav>
      {loginSignUpBtns}
    </Navbar>
  );
};

export default WelcomeHeader;
