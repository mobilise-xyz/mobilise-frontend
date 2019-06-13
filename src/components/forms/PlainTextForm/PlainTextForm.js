import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './PlainTextForm.css';

const PlainTextForm = props => {
  const {
    noLabel = false,
    label = '',
    name,
    placeholder = '',
    content,
    disabled = false,
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
        as="textarea"
        id={label}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={content}
        onChange={handleChange}
        required
      />
    </Form.Group>
  );
};

PlainTextForm.defaultProps = {
  noLabel: false,
  label: '',
  placeholder: '',
  disabled: false
};

PlainTextForm.propTypes = {
  noLabel: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};

export default PlainTextForm;
