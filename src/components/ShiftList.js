import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ShiftCard from './ShiftCard';

const ShiftList = ({ heading, shifts = [''], cardStyle }) => (
  <ListGroup>
    {heading}
    {shifts.map(c => (
      <ListGroup.Item style={cardStyle} key={c.id} className="border-0">
        <ShiftCard title={c.title}>{c.body}</ShiftCard>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default ShiftList;
