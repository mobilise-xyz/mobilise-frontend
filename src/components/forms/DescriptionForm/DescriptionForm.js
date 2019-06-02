import React from 'react';
import { Form } from 'react-bootstrap';

const DescriptionForm = props => {
  const { description, handleChange } = props;
  return (
    <Form.Group>
      <Form.Label>Description</Form.Label>
      <Form.Control
        id="description"
        name="description"
        as="textarea"
        placeholder="Enter shift description"
        rows="3"
        value={description}
        onChange={handleChange}
        required
      />
    </Form.Group>
  );
};

export default DescriptionForm;
