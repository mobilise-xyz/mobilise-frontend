import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import availabilityConstants from '../../_constants/availability.constants';
import '../ShiftCard/ShiftCard.css';
import availabilityActions from '../../_actions/availability.actions';
import CardLayout from '../CardLayout';

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
  AVAILABILITY_AVAILABLE: 'YellowGreen',
  AVAILABILITY_MAYBE: 'Yellow',
  AVAILABILITY_UNAVAILABLE: 'LightGray'
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
      <Row key="grid-days-header">
        <Col />
        {days.map((day, dayIndex) => (
          <Col key={`grid-${days[dayIndex].toLowerCase()}-header`}>
            {days[dayIndex]}
          </Col>
        ))}
      </Row>
    ];
    grid.push(
      availability.map((time, timeIndex) => (
        <Row key={`grid-${times[timeIndex].toLowerCase()}`} className="pt-4">
          <Col>{times[timeIndex]}</Col>
          {time.map((day, dayIndex) => (
            <Col key={`grid-${days[dayIndex].toLowerCase()}`}>
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
    return (
      <CardLayout title="Availability">
        <Row>
          <Col md={9}>
            <p>
              Please select the times you will be available each week. This is
              not a commitment to a shift, but it will influence recommendations
              for shifts.
            </p>
          </Col>
          <Col>
            <Row noGutters>
              <Col>Grey</Col>
              <Col>Unavailable</Col>
            </Row>
            <Row noGutters>
              <Col>Yellow</Col>
              <Col>Maybe available</Col>
            </Row>
            <Row noGutters>
              <Col>Green</Col>
              <Col>Available</Col>
            </Row>
          </Col>
        </Row>
        <Container>{this.generateGrid(availability)}</Container>
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  const { availability } = state;
  return {
    availability
  };
};

export default connect(mapStateToProps)(AvailabilityPage);
