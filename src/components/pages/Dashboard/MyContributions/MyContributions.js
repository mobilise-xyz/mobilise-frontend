import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardColumns, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faClock } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import volunteerActions from '../../../../_actions/volunteer.actions';

const ContributionCard = ({ number, description, icon }) => (
  <Card>
    <Card.Header className="text-center text-primary">{icon}</Card.Header>
    <Card.Body className="text-center">
      <h1>{number}</h1>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer style={{ textAlign: 'right' }}>
      <FontAwesomeIcon icon={faShareAlt} />
    </Card.Footer>
  </Card>
);

ContributionCard.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};

class MyContributions extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(volunteerActions.getContributions(uid));
  }

  render() {
    const { contributions, contributionsLoading } = this.props;

    if (contributionsLoading === true) {
      return null;
    }

    const { shiftsCompleted, hours, challengesCompleted } = contributions;

    return (
      <Container className="pt-5">
        <h3>My Contributions</h3>
        <CardColumns>
          <ContributionCard
            number={shiftsCompleted}
            description="shifts completed"
            icon={<FontAwesomeIcon icon={faCalendarCheck} size="6x" />}
          />
          <ContributionCard
            number={hours}
            description="hours given"
            icon={<FontAwesomeIcon icon={faClock} size="6x" />}
          />
          <ContributionCard
            number={challengesCompleted}
            description="challenges completed"
            icon={<FontAwesomeIcon icon={faTrophy} size="6x" />}
          />
        </CardColumns>
      </Container>
    );
  }
}

// MyContributions.propTypes = {
//   contributions: PropTypes.shape({
//     shiftsCompleted: PropTypes.shape(
//       PropTypes.shape({
//         number: PropTypes.string.isRequired
//       })
//     ).isRequired,
//     hoursGiven: PropTypes.shape(
//       PropTypes.shape({
//         number: PropTypes.string.isRequired
//       })
//     ).isRequired,
//     challengesCompleted: PropTypes.shape(
//       PropTypes.shape({
//         number: PropTypes.string.isRequired
//       })
//     ).isRequired
//   }).isRequired
// };

const mapStateToProps = state => {
  const { contributions, contributionsLoading } = state.volunteers;
  return { contributions, contributionsLoading };
};

export default connect(mapStateToProps)(MyContributions);
