import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Card, CardColumns, Container, Row } from 'react-bootstrap';
import './HallOfFame.css';
import volunteerActions from '../../../../_actions/volunteer.actions';

const HallOfFameCard = ({ id, volunteerName, category, bottomText, icon }) => (
  <Card id={id} className="hallOfFameCard">
    <Card.Header>{category}</Card.Header>
    <span style={{ margin: 'auto' }}>{icon}</span>

    <Card.Body>
      <Card.Title>{volunteerName}</Card.Title>
      <Card.Text>{bottomText}</Card.Text>
    </Card.Body>
  </Card>
);

function getIconClassForRank(rank) {
  let iconClass = 'text-primary';
  switch (rank) {
    case 1:
      iconClass = 'text-gold';
      break;
    case 2:
      iconClass = 'text-silver';
      break;
    case 3:
      iconClass = 'text-bronze';
      break;
    default:
      break;
  }
  return iconClass;
}

function getRankNameForRank(rank) {
  switch (rank) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    default:
      return '-';
  }
}

function swapElements(arr, i, j) {
  const temp = arr[i];
  const newArr = arr;
  newArr[i] = arr[j];
  newArr[j] = temp;
  return newArr;
}

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
    const { lastWeekHours, lastWeekIncrease } = hallOfFame;

    let hoursOrdered = lastWeekHours;
    let increaseOrdered = lastWeekIncrease;

    if (lastWeekIncrease.length > 2) {
      hoursOrdered = swapElements(lastWeekHours, 0, 1);
      increaseOrdered = swapElements(lastWeekIncrease, 0, 1);
    }

    return (
      <Container className="pt-5">
        <h3>Hall Of Fame</h3>
        <Row className="justify-content-md-center" style={{ margin: '30px' }}>
          <h4>MOST HOURS</h4>
        </Row>
        <Row>
          <CardColumns>
            {hoursOrdered.map(val => {
              return (
                <HallOfFameCard
                  key={val.rank}
                  id={val.rank}
                  category={getRankNameForRank(val.rank)}
                  volunteerName={val.name}
                  bottomText={`${val.number} hours in the past week`}
                  icon={
                    <FontAwesomeIcon
                      className={`pt-3 ${getIconClassForRank(val.rank)}`}
                      icon={faStopwatch}
                      size={`${val.rank === 1 ? 10 : 6}x`}
                    />
                  }
                />
              );
            })}
          </CardColumns>
        </Row>
        <Row className="justify-content-md-center" style={{ margin: '30px' }}>
          <h4>ON THE RISE!</h4>
        </Row>
        <Row>
          <CardColumns>
            {increaseOrdered.map(val => {
              return (
                <HallOfFameCard
                  key={val.rank}
                  id={val.rank}
                  category={getRankNameForRank(val.rank)}
                  volunteerName={val.name}
                  bottomText={`${val.number}x increase in activity`}
                  icon={
                    <FontAwesomeIcon
                      className={`pt-3 ${getIconClassForRank(val.rank)}`}
                      icon={faChartLine}
                      size={`${val.rank === 1 ? 10 : 6}x`}
                    />
                  }
                />
              );
            })}
          </CardColumns>
        </Row>
      </Container>
    );
  }
}

HallOfFame.propTypes = {
  hallOfFame: PropTypes.shape({
    lastWeekHours: PropTypes.arrayOf({
      rank: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired
    }).isRequired,
    lastWeekIncrease: PropTypes.arrayOf({
      rank: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => {
  const { hallOfFame, hallOfFameLoading } = state.volunteers;
  return { hallOfFame, hallOfFameLoading };
};

export default connect(mapStateToProps)(HallOfFame);
