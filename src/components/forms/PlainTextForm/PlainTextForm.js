import React from 'react';
import { Form } from 'react-bootstrap';

const PlainTextForm = props => {
  const {
    noLabel = false,
    label,
    content,
    disabled = false,
    rows = '1',
    handleChange
  } = props;
  return (
    <Form.Group>
      {noLabel ? null : (
        <Form.Label>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Form.Label>
      )}
      <Form.Control
        id={label}
        name={label}
        disabled={disabled}
        placeholder={`Enter ${label}`}
        rows={rows}
        value={content}
        onChange={handleChange}
        required
        style={{ padding: 0 }}
      />
    </Form.Group>
  );
};

export default PlainTextForm;
