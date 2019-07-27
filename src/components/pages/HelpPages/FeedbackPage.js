import React from 'react';
import { Form, Button } from 'react-bootstrap';

import CardLayout from '../../CardLayout';

const FeedbackPage = () => (
  <CardLayout title="Feedback">
    <p>Your feedback is valuable to</p>
    <Form>
      <Form.Group>
        <Form.Label>Enter your message below</Form.Label>
        <Form.Control as="textarea" rows="30" />
      </Form.Group>
      <Button type="submit" className="btn-more-info">
        Send
      </Button>
    </Form>
  </CardLayout>
);

export default FeedbackPage;
