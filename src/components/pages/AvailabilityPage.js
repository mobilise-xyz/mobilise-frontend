import React from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import availabilityConstants from '../../_constants/availability.constants';
import '../ShiftCard/ShiftCard.css';
import availabilityActions from '../../_actions/availability.actions';
import CardLayout from '../CardLayout';
import history from '../../_helpers/history';

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

class AvailabilityPage extends React.Component {
  constructor(props) {
    super(props);

    const { uid } = JSON.parse(localStorage.getItem('user'));

    this.state = {
      uid
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { uid } = this.state;
    dispatch(availabilityActions.get(uid));
  }

  handleClick = (timeIndex, dayIndex, availabilityConstant) => {
    const { dispatch } = this.props;
    switch (availabilityConstant) {
      case availabilityConstants.AVAILABLE: {
        dispatch(availabilityActions.maybe(timeIndex, dayIndex));
        break;
      }
      case availabilityConstants.MAYBE: {
        dispatch(availabilityActions.unavailable(timeIndex, dayIndex));
        break;
      }
      case availabilityConstants.UNAVAILABLE: {
        dispatch(availabilityActions.available(timeIndex, dayIndex));
        break;
      }
      default: {
        dispatch(availabilityActions.unavailable(timeIndex, dayIndex));
      }
    }
  };

  generateGrid = availability => {
    console.log('GENERATING AVAILABILITY', availability);
    const grid = [
      <thead key="grid-days-header">
        <tr key="grid-days-header-row">
          <th style={{ width: '12.5%' }} />
          {days.map((day, dayIndex) => (
            <th
              style={{ width: '12.5%' }}
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
            <td>{times[timeIndex]}</td>
            {time.map((day, dayIndex) => (
              <td key={`grid-${days[dayIndex].toLowerCase()}`}>
                <DayCard
                  key={`${times[timeIndex]}-${days[dayIndex]}`}
                  timeIndex={timeIndex}
                  dayIndex={dayIndex}
                  availabilityConstant={day}
                  handleClick={this.handleClick}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );

    return <Table>{grid}</Table>;
  };

  handleSubmit = () => {
    const { uid } = this.state;
    const { availability, dispatch } = this.props;
    console.log(availability);
    dispatch(availabilityActions.update(uid, availability));
    history.push('/');
  };

  render() {
    const { availability } = this.props;
    console.log(availability);
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
        <Container className="table-responsive">
          {this.generateGrid(availability)}
        </Container>
        <Container className="pt-5 text-center">
          <Button
            variant="outline-primary"
            type="submit"
            onClick={this.handleSubmit}
          >
            Save changes
          </Button>
        </Container>
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
