import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

const placeholderActivity = [
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  }
];

const ActivityCard = ({ title, description }) => (
  <Card className="mt-1">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {description}{' '}
        <div id="share" style={{ textAlign: 'right' }}>
          <FontAwesomeIcon icon={faShareAlt} />
        </div>
      </Card.Text>
    </Card.Body>
  </Card>
);

ActivityCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

class MyActivity extends React.Component {
  componentDidMount() {
    // TODO get data
  }

  render() {
    return (
      <Container className="pt-5">
        <h3>My Activity</h3>
        <ListGroup>
          {placeholderActivity.map(activity => (
            <ActivityCard
              title={activity.title}
              description={activity.description}
            />
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default MyActivity;
