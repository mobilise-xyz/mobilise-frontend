import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import userActions from '../../actions/user.actions';
import Layout from '../Layout';

class UnconnectedLoginPage extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    // Logs the user out
    dispatch(userActions.logout());

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
      dispatch(userActions.login(email, password));
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              id="email"
              name="email"
              value={email}
              type="email"
              placeholder="e.g. willburr98@example.com"
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const LoginPage = connect(mapStateToProps)(UnconnectedLoginPage);
export default LoginPage;
