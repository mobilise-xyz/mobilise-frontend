import React from 'react';
import { Form } from 'react-bootstrap';

const LocationInput = props => {
  const { handleChange } = props;
  return (
    <Form.Group>
      <Form.Label>Location</Form.Label>
      <Form.Control
        id="location"
        name="location"
        type="location"
        required
        placeholder="e.g. Imperial College London"
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default LocationInput;
