import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import usersActions from '../../_actions/users.actions';
import CardLayout from '../CardLayout';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    // Logs the user out
    dispatch(usersActions.logout());

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(usersActions.login(email, password));
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <CardLayout title="Login" container>
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
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              id="password"
              name="password"
              value={password}
              type="password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" className="btn-more-info" block>
            Log in
          </Button>
        </Form>
      </CardLayout>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export default connect(mapStateToProps)(LoginPage);
