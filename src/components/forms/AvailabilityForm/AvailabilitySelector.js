import React from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import availabilityConstants from '../../../_constants/availability.constants';
import '../../ShiftCard/ShiftCard.css';
import availabilityActions from '../../../_actions/availability.actions';

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
    const { availability, dispatch } = this.props;
    const { uid } = this.state;

    if (!availability) {
      dispatch(availabilityActions.get(uid));
    }
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

  render() {
    const { availability } = this.props;
    return (
      <>
        <Row>
          <Col md={8}>
            <p>
              Please select the times you will be available each week. This is
              not a commitment to a shift, but it will influence recommendations
              for shifts. <br /> <br />
              Click on a slot to toggle availability!
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
                <Card style={miniCardStyle('#27a659')} />
              </Col>
              <Col>Available</Col>
            </Row>
          </Col>
        </Row>
        <Container className="table-responsive">
          {this.generateGrid(availability)}
        </Container>
      </>
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
