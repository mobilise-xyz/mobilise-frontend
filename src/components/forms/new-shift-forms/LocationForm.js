import React from 'react';
import { Form } from 'react-bootstrap';

export default class LocationForm extends React.Component {
  submit = () => console.log('Location and event type inputted'); // TODO create submit function

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Group controlId="locationForm">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="location"
            placeholder="Imperial College London"
          />
        </Form.Group>
        <Form.Group controlId="eventTypeForm">
          <Form.Label>Event Type</Form.Label>
          <Form.Control as="select">
            <option>super cool fundraiser</option>
            <option>add event type</option>
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
}
