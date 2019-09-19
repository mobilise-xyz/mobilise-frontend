import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardColumns, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faClock,
  faGrinBeam,
  faMeh
} from '@fortawesome/free-regular-svg-icons';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import volunteerActions from '../../../../_actions/volunteer.actions';

const ContributionCard = ({ number, description, icon }) => (
  <Card>
    <Card.Header className="text-center text-primary">{icon}</Card.Header>
    <Card.Body className="text-center">
      <h1>{number}</h1>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

ContributionCard.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};

class MyContributions extends React.Component {
  componentDidMount() {
    const { contributions, dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));

    if (!contributions) {
      dispatch(volunteerActions.getContributions(uid));
    }
  }

  render() {
    const { contributions, contributionsLoading } = this.props;

    if (contributionsLoading === true || !contributions) {
      return null;
    }

    const { shiftsCompleted, hours, metric, increase } = contributions;

    return (
      <Container className="pt-5">
        <h3>My Contributions</h3>
        <Row style={{ margin: '20px' }}>
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
            {metric ? (
              <ContributionCard
                number={metric.value ? metric.value : 0}
                description={`${metric.name} ${metric.verb} last week`}
                icon={
                  <FontAwesomeIcon
                    icon={metric.value > 0 ? faGrinBeam : faMeh}
                    size="6x"
                  />
                }
              />
            ) : null}
            {increase ? (
              <ContributionCard
                description={`${
                  increase >= 1 ? 'increase' : 'decrease'
                } in activity last week`}
                number={`${increase}x`}
                icon={
                  <FontAwesomeIcon
                    icon={increase >= 1 ? faChevronUp : faChevronDown}
                    className={increase >= 1 ? 'text-primary' : 'text-danger'}
                    size="6x"
                  />
                }
              />
            ) : null}
          </CardColumns>
        </Row>
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
