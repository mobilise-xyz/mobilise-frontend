import React from 'react';
import { Card } from 'react-bootstrap';

const ShiftCards = ({ title, children }) => {
  return (
    <Card title={title}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
      <button
        type="button"
        href="#"
        className="stretched-link"
        style={{ display: 'contents' }}
      >
        <span className="sr-only">lol</span>
      </button>
    </Card>
  );
};
export default ShiftCards;
