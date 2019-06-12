import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Container } from 'react-bootstrap';
import usersActions from '../../../_actions/users.actions';
import ContactPreferencesCheckboxes from './ContactPreferencesCheckboxes';

// Wrapper around ContacPreferencesCheckboxes. Just handles submission.
class ContactPreferencesForm extends React.Component {
  handleSubmit = () => {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const { contactPreferences, dispatch } = this.props;
    const { email, text } = contactPreferences;
    dispatch(usersActions.updateContactPreferences(uid, email, text));
  };

  render() {
    return (
      <Card className="p-3">
        <ContactPreferencesCheckboxes />
        <Container className="pt-5 text-center">
          <Button
            variant="outline-primary"
            type="button"
            onClick={this.handleSubmit}
          >
            Save changes
          </Button>
        </Container>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { contactPreferences, loading } = state.user;
  return {
    contactPreferences,
    loading
  };
};

export default connect(mapStateToProps)(ContactPreferencesForm);
