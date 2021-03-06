import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faStopwatch } from '@fortawesome/free-solid-svg-icons';
// import PropTypes from 'prop-types';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './HallOfFame.css';
import volunteerActions from '../../../../_actions/volunteer.actions';

const HallOfFameCard = ({ id, volunteerName, category, bottomText, icon }) => (
  <Card id={id} className="hallOfFameCard">
    <Card.Header>{category}</Card.Header>
    <span>{icon}</span>

    <Card.Body>
      <Card.Title>{volunteerName}</Card.Title>
      <Card.Text>{bottomText}</Card.Text>
    </Card.Body>
  </Card>
);

function getIconClassForRank(rank) {
  const classes = ['text-gold', 'text-silver', 'text-bronze'];
  if (rank <= 3 && rank > 0) {
    return classes[rank - 1];
  }
  return 'text-primary';
}

function getRankNameForRank(rank) {
  const names = ['1st', '2nd', '3rd'];
  if (rank <= 3 && rank > 0) {
    return names[rank - 1];
  }
  return '-';
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
    const { hallOfFame, dispatch } = this.props;

    if (!hallOfFame) {
      dispatch(volunteerActions.getHallOfFame());
    }
  }

  render() {
    const { hallOfFame, hallOfFameLoading } = this.props;

    if (hallOfFameLoading === true || !hallOfFame) {
      return null;
    }

    const { uid } = JSON.parse(localStorage.getItem('user'));

    const { lastWeekHours, lastWeekIncrease } = hallOfFame;

    let hoursOrdered = lastWeekHours;
    let increaseOrdered = lastWeekIncrease;

    if (lastWeekIncrease.length > 2 && lastWeekIncrease[1].rank !== 1) {
      increaseOrdered = swapElements(lastWeekIncrease, 0, 1);
    }
    if (lastWeekHours.length > 2 && lastWeekHours[1].rank !== 1) {
      hoursOrdered = swapElements(lastWeekHours, 0, 1);
    }

    return (
      <Container className="pt-5">
        <h3>Weekly Hall Of Fame</h3>
        <Row className="justify-content-md-center" style={{ margin: '40px' }}>
          <h4>MOST HOURS</h4>
        </Row>
        {hoursOrdered.length > 0 ? (
          <Row>
            {hoursOrdered.map(val => {
              return (
                <Col key={val.rank} style={{ marginTop: '5px' }} xs={8} md={4}>
                  <HallOfFameCard
                    md={1}
                    key={val.rank}
                    id={val.rank}
                    category={getRankNameForRank(val.rank)}
                    volunteerName={
                      val.uid === uid ? `${val.name} (You)` : val.name
                    }
                    bottomText={`${val.number} hours given last week`}
                    icon={
                      <FontAwesomeIcon
                        className={`pt-3 ${getIconClassForRank(val.rank)}`}
                        icon={faStopwatch}
                        size={`${val.rank === 1 ? 10 : 6}x`}
                      />
                    }
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>Add some volunteers!</p>
        )}
        <Row className="justify-content-md-center" style={{ margin: '40px' }}>
          <h4>ON THE RISE</h4>
        </Row>
        {increaseOrdered.length > 0 ? (
          <Row>
            {increaseOrdered.map(val => {
              return (
                <Col key={val.rank} style={{ marginTop: '5px' }} xs={8} md={4}>
                  <HallOfFameCard
                    key={val.rank}
                    id={val.rank}
                    category={getRankNameForRank(val.rank)}
                    volunteerName={
                      val.uid === uid ? `${val.name} (You)` : val.name
                    }
                    bottomText={`${val.number}x increase in activity last week`}
                    icon={
                      <FontAwesomeIcon
                        className={`pt-3 ${getIconClassForRank(val.rank)}`}
                        icon={faChartLine}
                        size={`${val.rank === 1 ? 10 : 6}x`}
                      />
                    }
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>Add some volunteers!</p>
        )}
      </Container>
    );
  }
}

// HallOfFame.propTypes = {
//   hallOfFame: PropTypes.shape({
//     lastWeekHours: PropTypes.arrayOf({
//       uuid: PropTypes.string.isRequired,
//       rank: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.number.isRequired
//     }).isRequired,
//     lastWeekIncrease: PropTypes.arrayOf({
//       uuid: PropTypes.string.isRequired,
//       rank: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.number.isRequired
//     }).isRequired
//   }).isRequired
// };

const mapStateToProps = state => {
  const { hallOfFame, hallOfFameLoading } = state.volunteers;
  return { hallOfFame, hallOfFameLoading };
};

export default connect(mapStateToProps)(HallOfFame);
