import React from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import availabilityConstants from '../../../_constants/availability.constants';
import '../../ShiftCard/ShiftCard.css';
import availabilityActions from '../../../_actions/availability.actions';

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

const miniCardStyle = colour => ({
  width: '1rem',
  height: '1rem',
  backgroundColor: colour,
  marginLeft: 'auto'
});

class AvailabilitySelector extends React.Component {
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
    console.log('AVAILABILITY MOUNT', dispatch);
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
  };

  render() {
    const { availability } = this.props;
    console.log(availability);
    return (
      <Card className="p-3">
        <Row>
          <Col md={8}>
            <p>
              Please select the times you will be available each week. This is
              not a commitment to a shift, but it will influence recommendations
              for shifts.
            </p>
          </Col>
          <Col>
            <Row>
              <Col className="text-right">
                <Card style={miniCardStyle('LightGray')} />
              </Col>
              <Col>Unavailable</Col>
            </Row>
            <Row>
              <Col>
                <Card style={miniCardStyle('Yellow')} />
              </Col>
              <Col>Maybe available</Col>
            </Row>
            <Row>
              <Col>
                <Card style={miniCardStyle('YellowGreen')} />
              </Col>
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
            type="button"
            onClick={this.handleSubmit}
          >
            Save changes
          </Button>
        </Container>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { availability } = state;
  return {
    availability
  };
};

export default connect(mapStateToProps)(AvailabilitySelector);
