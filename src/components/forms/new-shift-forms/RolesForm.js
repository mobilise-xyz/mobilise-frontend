import React from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
// import NumericInput from 'react-numeric-input';

export default class RolesForm extends React.Component {
  submit = () => console.log('Roles inputted'); // TODO create submit function

  _renderToken = (option, props, index) => {
    return (
      <Token key={index} onRemove={props.onRemove}>
        {`${option}\t`}
        {/* CREATES WARNING WHEN NUMBER ALTERED <NumericInput min={0} max={100} size={1} /> */}
      </Token>
    );
  };

  render() {
    return (
      <Form id="new-shift-form-part-3" onSubmit={this.submit}>
        <Form.Group controlId="locationForm">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="location"
            placeholder="e.g. Imperial College London"
          />
          {/* TODO: use google maps API & asyncTypeAhead */}
        </Form.Group>
        <Form.Group controlId="rolesForm">
          <Form.Label>Roles</Form.Label>
          <Typeahead // TODO make async
            renderToken={this._renderToken}
            id="Roles"
            bodyContainer
            clearButton
            placeholder="Add available roles for shift"
            options={["driver's mate", 'warehouse assistant']}
            allowNew
            multiple
          />
        </Form.Group>
      </Form>
    );
  }
}
