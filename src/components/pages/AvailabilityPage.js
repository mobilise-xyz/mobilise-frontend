import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import availabilityConstants from '../../_constants/availability.constants';
import Layout from '../Layout/Layout';
import '../ShiftCard/ShiftCard.css';
import availabilityActions from '../../_actions/availability.actions';

const times = ['Morning', 'Afternoon', 'Evening'];

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
  AVAILABILITY_AVAILABLE: 'green',
  AVAILABILITY_MAYBE: 'yellow',
  AVAILABILITY_UNAVAILABLE: 'gray'
};

const DayCard = ({ timeIndex, dayIndex, availability, handleClick }) => (
  <Card style={{ backgroundColor: availabilityColours[availability] }}>
    <Card.Body />
    <button
      type="button"
      className="stretched-link shift-card-btn"
      onClick={() => handleClick(timeIndex, dayIndex, availability)}
    >
      <span className="sr-only">Availability button</span>
    </button>
  </Card>
);

class AvailabilityPage extends React.Component {
  handleClick = (timeIndex, dayIndex, availability) => {
    console.log('CLICK AT', timeIndex, dayIndex, availability);
    const { dispatch } = this.props;
    switch (availability) {
      case availabilityConstants.AVAILABLE:
        dispatch(availabilityActions.maybe(timeIndex, dayIndex));
        break;
      case availabilityConstants.MAYBE:
        dispatch(availabilityActions.unavailable(timeIndex, dayIndex));
        break;
      case availabilityConstants.UNAVAILABLE:
        dispatch(availabilityActions.available(timeIndex, dayIndex));
        break;
      default:
        dispatch(availabilityActions.unavailable(timeIndex, dayIndex));
    }
  };

  generateGrid = availability => {
    const grid = [
      <Row>
        <Col />
        {days.map((day, dayIndex) => (
          <Col>{days[dayIndex]}</Col>
        ))}
      </Row>
    ];
    grid.push(
      availability.map((time, timeIndex) => (
        <Row className="pt-4">
          <Col>{times[timeIndex]}</Col>
          {time.map((day, dayIndex) => (
            <Col id={`grid-${days[dayIndex].toLowerCase()}`}>
              <DayCard
                key={`${times[timeIndex]}-${days[dayIndex]}`}
                timeIndex={timeIndex}
                dayIndex={dayIndex}
                availability={day}
                handleClick={this.handleClick}
              />
            </Col>
          ))}
        </Row>
      ))
    );

    return grid;
  };

  render() {
    const { availability } = this.props;
    return <Layout>{this.generateGrid(availability)}</Layout>;
  }
}

const mapStateToProps = state => {
  const { availability } = state;
  return {
    availability
  };
};

export default connect(mapStateToProps)(AvailabilityPage);
