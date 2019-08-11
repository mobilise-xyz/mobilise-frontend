/* eslint-disable react/no-unused-state */ // Disabled because state is used and modified in handleChange
import React, { Component } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { validateAll } from 'indicative/validator';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      secondName: '',
      email: '',
      contactNumber: '',
      password: '',
      password_confirmation: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // TODO: decide what to do here: between validating all using indicatives ValidateAll (done below) or validate in real-time as the form is being filled in, in the handleChange function (preferred)
    const data = this.state;
    const schema = {
      firstName: 'required|alpha',
      secondName: 'required|alpha',
      email: 'required|email',
      contactNumber: 'required|number',
      password: 'required|min:4|max:40|confirmed'
    };
    const messages = {
      required: 'We need this data to sign you up as a volunteer!',
      'email.email': 'Please enter a valid email address',
      'password.confirmed': 'The passwords do not match'
    };

    // TODO: something correct inside here
    validateAll(data, schema, messages)
      .then(() => {
        console.log('Info entered is valid');
      })
      .catch(errors => {
        // TODO: Weird isObject is not a function error coming from here to fix
        console.log(errors.message);
      });
  };

  render() {
    return (
      <Form>
        <Form.Row className="mb-4">
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              name="firstName"
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              name="secondName"
              onChange={this.handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row className="mb-4">
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control required name="email" onChange={this.handleChange} />
          </Col>
          <Col>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              name="contactNumber"
              onChange={this.handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row className="mb-4">
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              id="confirm-password"
              name="password_confirmation"
              type="password"
              onChange={this.handleChange}
            />
          </Col>
        </Form.Row>
        <div className="text-center" style={{ margin: 'auto' }}>
          <Button
            type="submit"
            className="btn-more-info"
            onClick={this.handleSubmit}
            block
          >
            Sign me up!
          </Button>
        </div>
      </Form>
    );
  }
}

export default SignUpForm;
