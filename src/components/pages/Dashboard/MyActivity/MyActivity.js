import React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';

const placeholderActivity = [
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  },
  {
    title: 'Completed your first shift!',
    description: 'You volunteered for Tesco Pickup.'
  }
];

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
//
// {/*<FontAwesomeIcon icon={faTrophy} />*/}
//
// {/*<Card.Body>*/}
// {/*<Card.Title>{title}</Card.Title>*/}
// {/*<Card.Text>*/}
// {/*{description}*/}
// {/**/}
// {/*</Card.Text>*/}

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
