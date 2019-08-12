import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import usersActions from '../../../_actions/users.actions';

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
      e.target.setCustomValidity('Passwords do not Match');
    } else {
      e.target.setCustomValidity('');
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
        <Row className="mb-2 col-md-12">
          <Col>
            <Button
              onClick={this.toggleOpen}
              aria-controls="privacy-policy-button"
              aria-expanded={open}
            >
              Read Privacy Policy
            </Button>
          </Col>
          <Col>
            <Card>
              <Card.Text>
                Please read and agree to the terms of the privacy policy before
                signing up.
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <Row>
          <Collapse in={open} className="mt-2">
            <Card>
              <Card.Header>Privacy Policy</Card.Header>
              <Card.Text>
                We take your privacy seriously. To better protect your privacy
                we provide this privacy policy notice explaining the way your
                personal information is collected and used.
              </Card.Text>
              <Card.Subtitle>Collection of routine information</Card.Subtitle>
              <Card.Text>
                To Cover: What information do we collect? How do we use the
                information? What information do we share?
              </Card.Text>
              <Card.Subtitle>Links to third party websites</Card.Subtitle>
              <Card.Text>
                We have included links on this website for your use and
                reference. We are not responsible for the privacy policies on
                these websites. You should be aware that the privacy policies of
                these websites may differ from our own.
              </Card.Text>
              <Card.Subtitle>Security</Card.Subtitle>
              <Card.Text>
                The security of your personal information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage, is 100% secure. While we strive
                to use commercially acceptable means to protect your personal
                information, we cannot guarantee its absolute security.
              </Card.Text>
              <Card.Subtitle>Changes to this privacy policy</Card.Subtitle>
              <Card.Text className="mb-2">
                This Privacy Policy is effective as of June 30th 2019 and will
                remain in effect except with respect to any changes in its
                provisions in the future, which will be in effect immediately
                after being posted on this page. We reserve the right to update
                or change our Privacy Policy at any time and you should check
                this Privacy Policy periodically. If we make any material
                changes to this Privacy Policy, we will notify you either
                through the email address you have provided us, or by placing a
                prominent notice on our website.
              </Card.Text>
            </Card>
          </Collapse>
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
