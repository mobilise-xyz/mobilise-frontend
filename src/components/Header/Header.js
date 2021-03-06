import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';
import logo from '../../assets/images/logo-white.png';
import VolunteerHeader from './VolunteerHeaderNav';
import AdminHeader from './AdminHeader';
import WelcomeHeader from './WelcomeHeader';
import usersActions from '../../_actions/users.actions';
import CHLogo from './CHLogo';

class Header extends React.Component {
  componentDidMount() {
    // Retrieve name from uid
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return;
    }

    const { uid } = user;
    const { dispatch } = this.props;
    dispatch(usersActions.get(uid));
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));

    const { loggedIn, location, firstName, lastName } = this.props;

    if (!user || !loggedIn) {
      return <WelcomeHeader location={location} />;
    }
    const { isAdmin } = user;
    const adminMessage = isAdmin ? '(Admin)' : '(Volunteer)';

    let nameMessage = '';
    if (firstName !== undefined) {
      nameMessage = `Logged in as ${firstName} ${lastName} ${adminMessage}`;
    }

    return (
      <Navbar
        collapseOnSelect
        variant="dark"
        bg="primary"
        expand="lg"
        sticky="top"
        style={{ zIndex: 2000 }}
      >
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
        <Nav className="mr-auto">
          <CHLogo colour="white" />
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isAdmin ? <AdminHeader /> : <VolunteerHeader />}
          </Nav>
          <Navbar.Text className="mr-sm-2">{nameMessage}</Navbar.Text>
          {/* Settings dropdown */}
          <NavDropdown
            alignRight
            title={
              <i className="material-icons" style={{ verticalAlign: 'sub' }}>
                settings
              </i>
            }
            className="mr-sm-2"
          >
            <LinkContainer to="settings">
              <NavDropdown.Item>Settings</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="security">
              <NavDropdown.Item>Change Password</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="privacy">
              <NavDropdown.Item>Privacy</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/help/feedback">
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
  }
}

const mapStateToProps = state => {
  const { firstName, lastName } = state.user;
  return {
    firstName,
    lastName
  };
};
export default connect(mapStateToProps)(Header);
