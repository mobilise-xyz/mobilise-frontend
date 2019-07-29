import React from 'react';
import { Button, Form } from 'react-bootstrap';

const SignUpForm = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>First name</Form.Label>
        <Form.Control required />
      </Form.Group>
      ,
      <Form.Group>
        <Form.Label>Last name</Form.Label>
        <Form.Control required />
      </Form.Group>
      ,
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control required />
        <Form.Text className="text-muted">
          We&apos;ll never share you information with anyone.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="Send me news" />
      </Form.Group>
      {/* TODO: @Will or 'Joon to inject formbuilder qs form using redux */}
      <div className="text-center" style={{ margin: 'auto' }}>
        <Button variant="primary" type="submit">
          Sign me up!
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
