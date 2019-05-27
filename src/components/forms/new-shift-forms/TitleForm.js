import React from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export default class TitleForm extends React.Component {
  submit = () => console.log('Location and event type inputted'); // TODO create submit function

  render() {
    return (
      <Form id="new-shift-form-part-1" onSubmit={this.submit}>
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
        <Form.Group controlId="descriptionForm">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      </Form>
    );
  }
}
