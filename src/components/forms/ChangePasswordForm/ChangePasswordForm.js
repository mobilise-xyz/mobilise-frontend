import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form } from 'react-bootstrap';
import usersActions from '../../../_actions/users.actions';

// Wrapper around ContactPreferencesCheckboxes. Just handles submission.
class ChangePasswordForm extends React.Component {
  state = {
    oldPassword: '',
    newPassword: ''
  };

  isSecure = password => {
    return new RegExp(
      '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))' +
        '(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
    ).test(password);
  };

  handleDataChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { oldPassword, newPassword } = this.state;
    dispatch(usersActions.changePassword(oldPassword, newPassword));
  };

  handleNewPasswordChange = e => {
    const { value } = e.target;
    if (value.length < 8) {
      e.target.setCustomValidity(
        'Password is too short. Requires at least 8 characters.'
      );
    } else if (!this.isSecure(value)) {
      e.target.setCustomValidity(
        'Password must be 8 characters, contain at ' +
          'least one upper case letter, one lower case letter and one ' +
          'number/special character.'
      );
    } else {
      e.target.setCustomValidity('');
    }
    this.handleDataChange(e);
  };

  handleConfirmPasswordChange = e => {
    const { newPassword } = this.state;
    const { value } = e.target;
    if (newPassword !== value) {
      e.target.setCustomValidity('Passwords do not match');
    } else {
      e.target.setCustomValidity('');
    }
  };

  render() {
    return (
      <Card className="p-3">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Old password</Form.Label>
            <Form.Control
              required
              id="oldPassword"
              name="password"
              type="password"
              onChange={this.handleDataChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              required
              id="newPassword"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={this.handleNewPasswordChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={this.handleConfirmPasswordChange}
            />
          </Form.Group>
          <div className="text-center" style={{ margin: 'auto' }}>
            <Button variant="outline-primary" type="submit">
              Save changes
            </Button>
          </div>
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

export default connect(mapStateToProps)(ChangePasswordForm);
