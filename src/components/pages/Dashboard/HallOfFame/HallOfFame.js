import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardColumns, Container } from 'react-bootstrap';
import './HallOfFame.css';
import volunteerActions from '../../../../_actions/volunteer.actions';

const HallOfFameCard = ({ id, volunteerName, category, bottomText }) => (
  <Card id={id} className="hallOfFameCard">
    <Card.Header>{category}</Card.Header>
    <Card.Img src="https://via.placeholder.com/150" />

    <Card.Body>
      <Card.Title>{volunteerName}</Card.Title>
      <Card.Text>{bottomText}</Card.Text>
    </Card.Body>
  </Card>
);

class HallOfFame extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(volunteerActions.getHallOfFame());
  }

  render() {
    const { hallOfFame, hallOfFameLoading } = this.props;

    if (hallOfFameLoading === true) {
      return null;
    }

    const { fastResponder, mostHours, onTheRise } = hallOfFame;

    return (
      <Container className="pt-5">
        <h3>Hall Of Fame</h3>
        <CardColumns>
          <HallOfFameCard
            id="fastestResponder"
            category="Fastest Responder"
            volunteerName={fastResponder.name}
            bottomText={`${fastResponder.number} last minute responses`}
          />
          <HallOfFameCard
            id="mostHours"
            category="Most Hours"
            volunteerName={mostHours.name}
            bottomText={`${mostHours.name} hours in the past week`}
          />
          <HallOfFameCard
            id="onTheRise"
            category="On the Rise"
            volunteerName={onTheRise.name}
            bottomText={`x${onTheRise.number} increase in activity`}
          />
        </CardColumns>
      </Container>
    );
  }
}

HallOfFame.propTypes = {
  hallOfFame: PropTypes.shape({
    fastResponder: {
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }.isRequired,
    mostHours: {
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }.isRequired,
    onTheRise: {
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }.isRequired
  }).isRequired
};

const mapStateToProps = state => {
  const { hallOfFame, hallOfFameLoading } = state.volunteers;
  return { hallOfFame, hallOfFameLoading };
};

export default connect(mapStateToProps)(HallOfFame);
