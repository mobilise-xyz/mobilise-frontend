import React from 'react';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import usersActions from '../../../_actions/users.actions';

import PrivacyPolicy from '../../PrivacyPolicy';

class SignUpForm extends React.Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      telephone: ''
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

    dispatch(
      usersActions.register(
        data.firstName,
        data.lastName,
        data.email,
        data.telephone,
        data.password,
        token
      )
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                id="firstName"
                required
                onChange={this.handleDataChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                id="lastName"
                required
                onChange={this.handleDataChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                required
                type="email"
                onChange={this.handleDataChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                id="telephone"
                required
                type="tel"
                pattern="[0-9]{7,}"
                title="Must be a valid mobile phone number"
                onChange={this.handleDataChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={this.handlePasswordChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                id="confirmedPassword"
                name="password"
                type="password"
                onChange={this.handleConfirmPasswordChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Row style={{ display: 'inline' }}>
          <PrivacyPolicy />
        </Row>
        <Row>
          <InputGroup className="mb-3 ml-3">
            <InputGroup.Prepend className="mr-2">
              <InputGroup.Checkbox
                aria-label="Privacy Policy Checkbox"
                name="pp-checkbox"
                type="checkbox"
                required
              />
            </InputGroup.Prepend>
            <InputGroup.Text>
              I have read and understand the information outlined in this
              privacy policy.
            </InputGroup.Text>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup className="mb-3 ml-3">
            <InputGroup.Prepend className="mr-2">
              <InputGroup.Checkbox
                aria-label="Over 16 Checkbox"
                name="age-checkbox"
                type="checkbox"
                required
              />
            </InputGroup.Prepend>
            <InputGroup.Text>
              I confirm that I am aged 16 or over.
            </InputGroup.Text>
          </InputGroup>
        </Row>
        <div className="text-center" style={{ margin: 'auto' }}>
          <Button variant="primary" type="submit" className="btn-confirm" block>
            Sign me up!
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect()(SignUpForm);
