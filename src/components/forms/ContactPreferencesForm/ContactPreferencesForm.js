import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Container, Form } from 'react-bootstrap';
import usersActions from '../../../_actions/users.actions';

class ContactPreferencesForm extends React.Component {
  componentDidMount() {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const { dispatch } = this.props;

    dispatch(usersActions.get(uid));
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    const { contactPreferences, dispatch } = this.props;

    if (!contactPreferences) {
      dispatch(
        usersActions.updatePreferenceState({
          ...contactPreferences,
          [name]: checked
        })
      );
    }
  };

  handleSubmit = () => {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const { contactPreferences, dispatch } = this.props;
    const { email, text } = contactPreferences;
    dispatch(usersActions.updateContactPreferences(uid, email, text));
  };

  render() {
    const { contactPreferences, loading } = this.props;

    if (loading === true || !contactPreferences) {
      return null;
    }

    const { email, text } = contactPreferences;

    return (
      <Card className="p-3">
        <Form>
          <Form.Group>
            <Form.Label>I would prefer to be contacted by...</Form.Label>
            <Form.Check
              name="email"
              type="checkbox"
              label="Email"
              checked={email}
              onChange={this.handleChange}
            />
            <Form.Check
              name="text"
              type="checkbox"
              label="SMS"
              checked={text}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              This will be used by volunteer coordinators to contact you with
              information regarding a shift.
            </Form.Text>
            <Container className="pt-5 text-center">
              <Button
                variant="outline-primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Save changes
              </Button>
            </Container>
          </Form.Group>
        </Form>
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
