import React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import volunteerActions from '../../../../_actions/volunteer.actions';

const ActivityCard = ({ title, description }) => (
  <Card className="mt-1">
    <Card.Body className="h-100 align-items-center">
      <Row className="h-100">
        <Col md={1} className="h-100" style={{ margin: 'auto' }}>
          <FontAwesomeIcon icon={faTrophy} size="3x" className="text-primary" />
        </Col>
        <Col>
          <Card.Title>{title}</Card.Title>
          <Card.Body style={{ padding: 0 }}>{description}</Card.Body>
        </Col>
        <Col md={1} style={{ marginTop: 'auto' }}>
          <FontAwesomeIcon icon={faShareAlt} />
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

ActivityCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

class MyActivity extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(volunteerActions.getActivity(uid));
  }

  render() {
    const { activity: activities, activityLoading } = this.props;

    if (activityLoading === true) {
      return null;
    }

    return (
      <Container className="pt-5">
        <ListGroup>
          {activities.map(activity => (
            <ActivityCard
              title={activity.title}
              description={activity.description}
              key={activity.title}
            />
          ))}
        </ListGroup>
      </Container>
    );
  }
}

// MyActivity.propTypes = {
//   activity: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string
//     })
//   ).isRequired
// };

const mapStateToProps = state => {
  const { activity, activityLoading } = state.volunteers;
  return { activity, activityLoading };
};

export default connect(mapStateToProps)(MyActivity);
