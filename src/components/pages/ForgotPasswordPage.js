import React from 'react';
import { Button, Form } from 'react-bootstrap';
import CardLayout from '../CardLayout';

class ForgotPasswordPage extends React.Component {
  state = {
    email: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email } = this.state;
    return (
      <CardLayout title="Forgot Password" container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              id="email"
              name="email"
              value={email}
              type="email"
              placeholder="e.g. someone@example.com"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              Enter your email above and we&apos;ll send you a link to reset
              your password.
            </Form.Text>
          </Form.Group>
          <Button type="submit" className="btn-more-info" block>
            Confirm
          </Button>
        </Form>
      </CardLayout>
    );
  }
}

export default ForgotPasswordPage;
