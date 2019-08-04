import React from 'react';
import { Button, Form } from 'react-bootstrap';

const SignUpForm = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>First name</Form.Label>
        <Form.Control required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last name</Form.Label>
        <Form.Control required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contact Number</Form.Label>
        <Form.Control required />
      </Form.Group>
      {/* TODO: Validate these password bois */}
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control required id="password" name="password" type="password" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control required id="password" name="password" type="password" />
      </Form.Group>
      <div className="text-center" style={{ margin: 'auto' }}>
        <Button variant="primary" type="submit" className="btn-more-info">
          Sign me up!
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
