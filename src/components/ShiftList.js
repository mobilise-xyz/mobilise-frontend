import React from 'react';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import ShiftCard from './ShiftCard';

const ShiftList = ({
  shifts,
  cardClass,
  recommendedCardClass = cardClass,
  isAdmin = false,
  clickableCards = true
}) => {
  const shiftMap = [];
  let i = 0;
  let j = 0;
  while (i < shifts.length) {
    const shift = shifts[i];
    const shiftDate = moment(shift.date, 'YYYY-MM-DD');
    const shiftsForDate = [shift];
    i += 1;
    while (i < shifts.length) {
      const nextShift = shifts[i];
      if (shiftDate.isSame(moment(nextShift.date, 'YYYY-MM-DD'))) {
        shiftsForDate.push(nextShift);
      } else {
        break;
      }
      i += 1;
    }
    shiftDate.isValid();
    shiftMap[j] = [shiftDate, shiftsForDate];
    j += 1;
  }
  const shiftLists = [];
  shiftMap.forEach(entry => {
    shiftLists.push(
      <ListGroup>
        <DateHeading
          weekday={entry[0].format('dddd')}
          date={entry[0].format('Do MMM')}
        />
        {entry[1].map(c => {
          let card = cardClass;
          c.requirements.forEach(req => {
            if (req.recommended) {
              card = recommendedCardClass;
            }
          });
          return (
            <ListGroup.Item key={c.id} className={`border-0 ${card}`}>
              <ShiftCard
                clickable={clickableCards}
                isAdmin={isAdmin}
                shiftData={c}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  });
  return shiftLists;
};

const DateHeading = ({ weekday, date }) => (
  <>
    <h3>{weekday}</h3>
    <p>{date}</p>
  </>
);

export default ShiftList;
