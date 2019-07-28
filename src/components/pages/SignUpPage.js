import React from 'react';
import { Button, Form } from 'react-bootstrap';
import CardLayout from '../CardLayout';

const placeholderForms = [
  <Form.Group>
    <Form.Label>First name</Form.Label>
    <Form.Control required />
  </Form.Group>,
  <Form.Group>
    <Form.Label>Last name</Form.Label>
    <Form.Control required />
  </Form.Group>,
  <Form.Group>
    <Form.Label>Email</Form.Label>
    <Form.Control required />
    <Form.Text className="text-muted">
      We&apos;ll never share you information with anyone.
    </Form.Text>
  </Form.Group>,
  <Form.Group>
    <Form.Check type="checkbox" label="Send me news" />
  </Form.Group>
];

export default class SignUpPage extends React.Component {
  state = {
    // forms: [<Spinner animation="border" />]
    forms: placeholderForms
  };

  // TODO: TIGER Privacy and Data security form.
  render() {
    const { forms } = this.state;
    return (
      <CardLayout title="Sign up">
        <Form>
          {forms}
          <div className="text-center" style={{ margin: 'auto' }}>
            <Button variant="primary" type="submit">
              Sign me up!
            </Button>
          </div>
        </Form>
      </CardLayout>
    );
  }
}
