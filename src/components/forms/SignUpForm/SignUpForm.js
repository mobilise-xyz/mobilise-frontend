import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import usersActions from '../../../_actions/users.actions';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the confirmed password DOM element
    this.confirmedPasswordRef = React.createRef();
  }

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

  handleConfirmPasswordChange = e => {
    const { data } = this.state;
    const { password } = data;
    const { value } = e.target;
    const confirmPassword = this.confirmedPasswordRef.current;
    if (password !== value) {
      confirmPassword.setCustomValidity('Passwords do not Match');
    } else {
      confirmPassword.setCustomValidity('');
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { data } = this.state;
    const { dispatch } = this.props;

    dispatch(
      usersActions.register(
        data.firstName,
        data.lastName,
        data.email,
        data.telephone,
        data.password
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
                pattern="[0-9]{9,11}"
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
                onChange={this.handleDataChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                id="confirmedPassword"
                ref={this.confirmedPasswordRef}
                name="password"
                type="password"
                onChange={this.handleConfirmPasswordChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <div className="text-center" style={{ margin: 'auto' }}>
          <Button variant="primary" type="submit" className="btn-confirm" block>
            Sign me up!
          </Button>
        </div>
      </Form>
    );
  }
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SignUpForm);
