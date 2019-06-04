import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ShiftCard from './ShiftCard';

const ShiftList = ({
  heading,
  subheading,
  shifts,
  cardClass,
  isAdmin = false,
  clickableCards = true
}) => (
  <ListGroup>
    <DateHeading weekday={heading} date={subheading} />
    {shifts.map(c => (
      <ListGroup.Item key={c.id} className={`border-0 ${cardClass}`}>
        <ShiftCard clickable={clickableCards} isAdmin={isAdmin} shiftData={c} />
      </ListGroup.Item>
    ))}
  </ListGroup>
);

const DateHeading = ({ weekday, date }) => (
  <>
    <h3>{weekday}</h3>
    <p>{date}</p>
  </>
);

export default ShiftList;
