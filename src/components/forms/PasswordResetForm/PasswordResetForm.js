import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import usersActions from '../../../_actions/users.actions';

class PasswordResetForm extends React.Component {
  state = {
    data: {
      password: ''
    }
  };

  handleDataChange = e => {
    const { id, value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [id]: value
      }
    }));
  };

  isSecure = password => {
    return new RegExp(
      '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))' +
        '(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
    ).test(password);
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
    this.handleDataChange(e);
  };

  handleConfirmPasswordChange = e => {
    const { data } = this.state;
    const { password } = data;
    const { value } = e.target;
    if (password !== value) {
      e.target.setCustomValidity('Passwords do not match');
    } else {
      e.target.setCustomValidity('');
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { data } = this.state;
    const { dispatch, token } = this.props;

    dispatch(usersActions.resetPassword(data.password, token));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
            name="password"
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
