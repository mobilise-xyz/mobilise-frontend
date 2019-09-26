import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import CardLayout from '../CardLayout';
import usersActions from '../../_actions/users.actions';

class ForgotPasswordPage extends React.Component {
  state = {
    email: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email } = this.state;
    const { dispatch } = this.props;

    dispatch(usersActions.forgotPassword(email));
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

export default connect()(ForgotPasswordPage);
