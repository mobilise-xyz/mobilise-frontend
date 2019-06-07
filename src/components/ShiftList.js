import React from 'react';
import moment from 'moment';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ShiftCard from './ShiftCard';

const partitionShiftsByDate = shifts => {
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
  return shiftMap;
};

const ShiftList = ({
  shifts,
  cardClass,
  recommendedCardClass = cardClass,
  isAdmin = false,
  clickableCards = true
}) => {
  const shiftMap = partitionShiftsByDate(shifts);
  const shiftLists = [];
  shiftMap.forEach(entry => {
    shiftLists.push(
      <Container key={entry[0]}>
        <Row>
          <Col md={2} style={{ paddingTop: '5%' }}>
            <DateHeading
              weekday={entry[0].format('dddd')}
              date={entry[0].format('Do MMMM')}
            />
          </Col>
          <Col md={10}>
            <ListGroup>
              {entry[1].map(c => {
                let recommended = false;
                let card = cardClass;
                c.requirements.forEach(req => {
                  if (req.recommended) {
                    card = recommendedCardClass;
                    recommended = true;
                  }
                });
                return (
                  <ListGroup.Item
                    key={c.id}
                    className={`${card}`}
                    style={{
                      borderRadius: '1.1rem',
                      backgroundColour: '#C9E1BF'
                    }}
                  >
                    <ShiftCard
                      clickable={clickableCards}
                      isAdmin={isAdmin}
                      shiftData={c}
                      recommended={recommended}
                    />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  });
  return shiftLists;
};

const DateHeading = ({ weekday, date }) => (
  <>
    <h5 style={{ textAlign: 'right' }}>{weekday}</h5>
    <p style={{ color: '#575757', textAlign: 'right' }}>{date}</p>
  </>
);

export default ShiftList;
