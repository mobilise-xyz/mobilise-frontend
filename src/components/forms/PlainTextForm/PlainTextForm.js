import React from 'react';
import { Form } from 'react-bootstrap';

const PlainTextForm = props => {
  const {
    label,
    content,
    disabled = false,
    plaintext = true,
    rows = '1',
    handleChange
  } = props;
  return (
    <Form.Group>
      {label !== '' ? (
        <Form.Label>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Form.Label>
      ) : null}
      <Form.Control
        id={label}
        name={label}
        as="textarea"
        disabled={disabled}
        plaintext={plaintext}
        placeholder={`Enter ${label}`}
        rows={rows}
        value={content}
        onChange={handleChange}
        required
      />
    </Form.Group>
  );
};

export default PlainTextForm;
