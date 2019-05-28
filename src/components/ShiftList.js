import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ShiftCard from './ShiftCard';

const ShiftList = ({ heading, shifts = [''], cardStyle }) => (
  <ListGroup>
    {heading}
    {shifts.map(c => (
      <ListGroup.Item key={c.id} style={cardStyle} className="border-0">
        <ShiftCard shiftData={c} />
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default ShiftList;
