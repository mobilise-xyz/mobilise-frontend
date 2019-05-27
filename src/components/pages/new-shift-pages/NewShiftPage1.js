import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form } from 'react-bootstrap';
import WizardLayout from '../../WizardLayout';

// TODO:  make a carousel maybe??
export default class NewShiftPage1 extends React.Component {
  render() {
    return (
      <WizardLayout heading="New Shift">
        <Form id="new-shift-form" onSubmit={this.submit}>
          <Form.Group controlId="locationForm">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="location"
              placeholder="e.g. Imperial College London"
            />
          </Form.Group>
          <Form.Group controlId="eventTypeForm">
            <Form.Label>Event Type</Form.Label>
            <Typeahead // TODO make async
              id="Event type"
              placeholder="Choose an event type, or create a new one"
              allowNew
              onChange={selected => console.log(selected)}
              options={['Fundraiser', 'Pickup']} // TODO
            />
          </Form.Group>
        </Form>
      </WizardLayout>
    );
  }
}
