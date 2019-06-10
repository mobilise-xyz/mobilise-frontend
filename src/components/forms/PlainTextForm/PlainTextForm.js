import React from 'react';
import { Form } from 'react-bootstrap';

const PlainTextForm = props => {
  const {
    noLabel = false,
    label,
    placeHolder = '',
    content,
    disabled = false,
    rows = '1',
    handleChange
  } = props;
  const placeholder = placeHolder === '' ? `Enter ${label}` : placeHolder;
  return (
    <Form.Group>
      {noLabel ? null : (
        <Form.Label>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Form.Label>
      )}
      <Form.Control
        as="textarea"
        id={label}
        name={label}
        disabled={disabled}
        placeholder={placeholder}
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
