import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAward,
  faChartLine,
  faStopwatch
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Card, CardColumns, Container } from 'react-bootstrap';
import './HallOfFame.css';
import volunteerActions from '../../../../_actions/volunteer.actions';

const HallOfFameCard = ({ id, volunteerName, category, bottomText, icon }) => (
  <Card id={id} className="hallOfFameCard">
    <Card.Header>{category}</Card.Header>
    {icon}

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
            icon={
              <FontAwesomeIcon
                className="pt-3 text-primary"
                icon={faStopwatch}
                size="6x"
              />
            }
          />
          <HallOfFameCard
            id="mostHours"
            category="Most Hours"
            volunteerName={mostHours.name}
            bottomText={`${mostHours.number} hours in the past week`}
            icon={
              <FontAwesomeIcon
                className="pt-3 text-primary"
                icon={faAward}
                size="6x"
              />
            }
          />
          <HallOfFameCard
            id="onTheRise"
            category="On the Rise"
            volunteerName={onTheRise.name}
            bottomText={`x${onTheRise.number} increase in activity`}
            icon={
              <FontAwesomeIcon
                className="pt-3 text-primary"
                icon={faChartLine}
                size="6x"
              />
            }
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
