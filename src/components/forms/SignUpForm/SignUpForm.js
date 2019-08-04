import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const SignUpForm = () => {
  return (
    <Form>
      <Form.Row className="mb-4">
        <Col>
          <Form.Label>First name</Form.Label>
          <Form.Control required />
        </Col>
        <Col>
          <Form.Label>Last name</Form.Label>
          <Form.Control required />
        </Col>
      </Form.Row>
      <Form.Row className="mb-4">
        <Col>
          <Form.Label>Email</Form.Label>
          <Form.Control required />
        </Col>
        <Col>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control required />
        </Col>
      </Form.Row>
      {/* TODO: Validate these password bois */}
      <Form.Row className="mb-4">
        <Col>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            id="password"
            name="password"
            type="password"
          />
        </Col>
        <Col>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            id="password"
            name="password"
            type="password"
          />
        </Col>
      </Form.Row>
      <div className="text-center" style={{ margin: 'auto' }}>
        <Button variant="primary" type="submit" className="btn-more-info" block>
          Sign me up!
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
