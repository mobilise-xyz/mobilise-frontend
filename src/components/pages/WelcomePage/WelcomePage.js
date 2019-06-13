import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import history from '../../../_helpers/history';
import AvailabilitySelector from '../../forms/AvailabilityForm/AvailabilitySelector';
import availabilityActions from '../../../_actions/availability.actions';
import ContactPreferencesCheckboxes from '../../forms/ContactPreferencesForm/ContactPreferencesCheckboxes';
import usersActions from '../../../_actions/users.actions';
import './WelcomePage.css';
import Layout from '../../Layout';

class WelcomePage extends Component {
  componentDidMount() {
    document.body.className = 'welcome-body';
  }

  componentWillUnmount() {
    document.body.className = '';
  }

  handleSubmit = () => {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const { availability, contactPreferences, dispatch } = this.props;
    const { email, text } = contactPreferences;

    dispatch(usersActions.updateContactPreferences(uid, email, text));
    dispatch(availabilityActions.update(uid, availability));

    history.push('/');
  };

  render() {
    return (
      <Layout className="welcome-page-layout">
        <Container>
          <Card>
            <Card.Body>
              <Card.Text>
                Welcome to Mobilise for City Harvest London! Please fill in your
                availability and contact preferences below. You can change these
                at any time in Settings!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <AvailabilitySelector />
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                <ContactPreferencesCheckboxes />
              </Card.Text>
            </Card.Body>
          </Card>
          <Container className="pt-5 text-center">
            <Button
              className="btn-get-started"
              type="button"
              onClick={this.handleSubmit}
            >
              Get started!
            </Button>
          </Container>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { availability } = state;
  const { contactPreferences } = state.user;
  return {
    availability,
    contactPreferences
  };
};
export default connect(mapStateToProps)(WelcomePage);
