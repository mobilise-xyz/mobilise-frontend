import React from 'react';
import { Card, Row, Table } from 'react-bootstrap';

const times = ['Morning', 'Afternoon', 'Evening'];
const timesInfo = ['6AM - 12PM', '12PM - 5PM', '5PM-11PM'];

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const availabilityColours = {
  AVAILABILITY_AVAILABLE: '#27a659',
  AVAILABILITY_MAYBE: 'Yellow',
  AVAILABILITY_UNAVAILABLE: 'LightGray'
};

const DayCard = ({
  timeIndex,
  dayIndex,
  availabilityConstant,
  handleClick
}) => (
  <Card style={{ backgroundColor: availabilityColours[availabilityConstant] }}>
    <Card.Body />
    <button
      type="button"
      className="stretched-link shift-card-btn"
      onClick={() => handleClick(timeIndex, dayIndex, availabilityConstant)}
    >
      <span className="sr-only">Availability button</span>
    </button>
  </Card>
);

function AvailabilityGrid(props) {
  const { availability, handleClick } = props;
  const grid = [
    <thead key="grid-days-header">
      <tr key="grid-days-header-row">
        <th style={{ width: '12.5%' }} />
        {days.map((day, dayIndex) => (
          <th
            style={{
              width: '12.5%',
              fontStyle: 'unset',
              color: 'unset',
              fontWeight: 'unset',
              textAlign: 'center'
            }}
            key={`grid-${days[dayIndex].toLowerCase()}-header`}
          >
            {days[dayIndex]}
          </th>
        ))}
      </tr>
    </thead>
  ];

  grid.push(
    <tbody key="grid-days-body  ">
      {availability.map((time, timeIndex) => (
        <tr key={`grid-${times[timeIndex].toLowerCase()}`} className="pt-4">
          <td>
            <Row>{times[timeIndex]}</Row>
            <Row style={{ color: 'gray' }}>{timesInfo[timeIndex]}</Row>
          </td>
          {time.map((day, dayIndex) => (
            <td key={`grid-${days[dayIndex].toLowerCase()}`}>
              <DayCard
                key={`${times[timeIndex]}-${days[dayIndex]}`}
                timeIndex={timeIndex}
                dayIndex={dayIndex}
                availabilityConstant={day}
                handleClick={handleClick}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return <Table>{grid}</Table>;
}

export default AvailabilityGrid;
