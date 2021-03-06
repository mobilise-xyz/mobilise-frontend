import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import usersActions from '../../../_actions/users.actions';

class PasswordResetForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  isSecure = password => {
    return new RegExp(
      '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))' +
        '(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
    ).test(password);
  };

  handleEmailChange = e => {
    const { value } = e.target;
    this.setState({ email: value });
  };

  handlePasswordChange = e => {
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
    this.setState({
      password: value
    });
  };

  handleConfirmPasswordChange = e => {
    const { password } = this.state;
    const { value } = e.target;
    if (password !== value) {
      e.target.setCustomValidity('Passwords do not match');
    } else {
      e.target.setCustomValidity('');
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { dispatch, token } = this.props;

    dispatch(usersActions.resetPassword(email, password, token));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row className="mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            id="email"
            name="email"
            type="email"
            placeholder="e.g. someone@example.com"
            onChange={this.handleEmailChange}
          />
        </Form.Row>
        <Form.Row className="mb-4">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            required
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={this.handlePasswordChange}
          />
        </Form.Row>
        <Form.Row className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            id="confirmedPassword"
            name="confirm-password"
            type="password"
            onChange={this.handleConfirmPasswordChange}
          />
        </Form.Row>
        <div className="text-center" style={{ margin: 'auto' }}>
          <Button variant="primary" type="submit" className="btn-confirm" block>
            Reset Password
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect()(PasswordResetForm);
