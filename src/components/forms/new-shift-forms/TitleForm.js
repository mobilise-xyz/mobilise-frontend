import React from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export default class TitleForm extends React.Component {
  submit = () => console.log('Location and event type inputted'); // TODO create submit function

  render() {
    return (
      <Form id="new-shift-form" onSubmit={this.submit}>
        <Form.Group controlId="titleForm">
          <Form.Label>Shift Title</Form.Label>
          <Typeahead // TODO make async
            id="Title"
            placeholder="Choose an event Title, or create a new one"
            allowNew
            onChange={selected => console.log(selected)}
            options={['Cake Sale', 'Food Managing']} // TODO
          />
        </Form.Group>
        <Form.Group controlId="locationForm">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="location"
            placeholder="e.g. Imperial College London"
          />
          {/* TODO: use google maps API somehow */}
        </Form.Group>
      </Form>
    );
  }
}
