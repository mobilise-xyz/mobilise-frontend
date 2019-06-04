import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ShiftCard from './ShiftCard';

const ShiftList = ({ heading, shifts, cardClass, isAdmin = false }) => (
  <ListGroup>
    {heading}
    {shifts.map(c => (
      <ListGroup.Item key={c.id} className={`border-0 ${cardClass}`}>
        <ShiftCard isAdmin={isAdmin} shiftData={c} />
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default ShiftList;
