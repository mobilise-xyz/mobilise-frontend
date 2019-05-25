import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class LoginForm extends React.Component {
  submit = () => console.log('lol'); // TODO create submit function

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Group controlId="loginFormEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="e.g. willburr98@example.com"
          />
        </Form.Group>
        <Form.Group controlId="loginFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
