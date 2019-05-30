import React from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const TitleForm = ({ title, shiftTitleOptions, handleChange }) => (
  <Form.Group controlId="titleForm">
    <Form.Label>Shift Title</Form.Label>
    <Typeahead // TODO make async
      id="title"
      name="shiftTitle"
      value={title}
      newSelectionPrefix="Add new title: "
      placeholder="Choose an event title, or create a new one"
      allowNew
      onChange={handleChange}
      options={shiftTitleOptions} // TODO
    />
  </Form.Group>
);

export default TitleForm;
