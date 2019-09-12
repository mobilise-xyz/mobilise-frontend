import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import availabilityConstants from '../../../_constants/availability.constants';
import '../../ShiftCard/ShiftCard.css';
import AvailabilityGrid from './AvailabilityGrid';
import availabilityActions from '../../../_actions/availability.actions';

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
          <AvailabilityGrid
            availability={availability}
            handleClick={this.handleClick}
          />
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
