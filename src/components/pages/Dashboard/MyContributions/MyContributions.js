import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardColumns, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import './MyContributions.css';

const ContributionCard = ({ metric, description }) => (
  <Card>
    <Card.Img variant="top" src="https://via.placeholder.com/150" />
    <Card.Body>
      <Card.Text className="text-center">
        <h1>{metric}</h1>
        <p>{description}</p>
      </Card.Text>
    </Card.Body>
    <Card.Footer style={{ textAlign: 'right' }}>
      <FontAwesomeIcon icon={faShareAlt} />
    </Card.Footer>
  </Card>
);

ContributionCard.propTypes = {
  metric: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

class MyContributions extends React.Component {
  componentDidMount() {
    // TODO get contributions
  }

  render() {
    return (
      <Container className="pt-5">
        <h3>My Contributions</h3>
        <CardColumns>
          <ContributionCard metric="10" description="shifts completed" />
          <ContributionCard metric="32" description="hours given" />
          <ContributionCard metric="4" description="challenges completed" />
        </CardColumns>
      </Container>
    );
  }
}

export default MyContributions;
