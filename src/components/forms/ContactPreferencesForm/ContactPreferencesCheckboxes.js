import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Form } from 'react-bootstrap';
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

    const contactType = name === 'email-checkbox' ? 'email' : 'text';

    dispatch(
      usersActions.updatePreferenceState({
        ...contactPreferences,
        [contactType]: checked
      })
    );
  };

  render() {
    const { contactPreferences, loading, isAdmin } = this.props;
    if (loading === true || !contactPreferences) {
      return null;
    }

    const { email, text } = contactPreferences;

    return (
      <Form>
        <Form.Group>
          This allows us to send notifications containing important information
          regarding shifts. For example:
          {isAdmin ? (
            <ul>
              <li>If a volunteer cancels a booking</li>
            </ul>
          ) : (
            <ul>
              <li>
                If a volunteer co-ordinator needs volunteers for a shift at late
                notice
              </li>
              <li>If a shift you are on is cancelled</li>
            </ul>
          )}
          I would like to be notified by...
          <Form.Check
            name="email-checkbox"
            type="checkbox"
            label="Email"
            checked={email}
            style={{ marginTop: '10px' }}
            onChange={this.handleChange}
          />
          <Form.Check
            name="text-checkbox"
            type="checkbox"
            label="SMS"
            checked={text}
            onChange={this.handleChange}
          />
          <Collapse in={!text && !email}>
            <Form.Text className="text-muted">
              You have not selected an option, you may miss important
              information relating to shifts!
            </Form.Text>
          </Collapse>
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
