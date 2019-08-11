import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import usersActions from '../../../_actions/users.actions';

class ContactPreferencesCheckboxes extends React.Component {
  componentDidMount() {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const { dispatch } = this.props;

    dispatch(usersActions.get(uid));
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    const { contactPreferences, dispatch } = this.props;

    dispatch(
      usersActions.updatePreferenceState({
        ...contactPreferences,
        [name]: checked
      })
    );
  };

  render() {
    const { contactPreferences, loading } = this.props;

    if (loading === true || !contactPreferences) {
      return null;
    }

    const { email, text } = contactPreferences;

    return (
      <Form>
        <Form.Group>
          <Form.Label>I would prefer to be contacted by...</Form.Label>
          <Form.Check
            name="email-checkbox"
            type="checkbox"
            label="Email"
            checked={email}
            onChange={this.handleChange}
          />
          <Form.Check
            name="text-checkbox"
            type="checkbox"
            label="SMS"
            checked={text}
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            This will be used by volunteer coordinators to contact you with
            information regarding a shift.
          </Form.Text>
        </Form.Group>
      </Form>
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

export default connect(mapStateToProps)(ContactPreferencesCheckboxes);
