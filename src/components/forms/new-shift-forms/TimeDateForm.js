import React from 'react';
import { Form } from 'react-bootstrap';

export default class TimeDateForm extends React.Component {
  submit = () => console.log('Time and Date inputted'); // TODO create submit function

  getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          {/* TODO: Find a decent date picker */}
        </Form.Group>
        <Form.Group controlId="start">
          <Form.Label>start</Form.Label>

          {/* TODO: Find a decent Time picker */}
          <Form.Label>end</Form.Label>
        </Form.Group>
      </Form>
    );
  }
}
