import React from 'react';
import { Card, CardColumns, Container } from 'react-bootstrap';
import './HallOfFame.css';

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
    // TODO get data
  }

  render() {
    return (
      <Container className="pt-5">
        <h3>Hall Of Fame</h3>
        <CardColumns>
          <HallOfFameCard
            id="fastestResponder"
            category="Fastest Responder"
            volunteerName="Mark Wheelhouse"
            bottomText="3 last minute responses"
          />
          <HallOfFameCard
            id="mostHours"
            category="Most Hours"
            volunteerName="Bill Bailey"
            bottomText="44 hours in the past week"
          />
          <HallOfFameCard
            id="onTheRise"
            category="On the Rise"
            volunteerName="Ben Dover"
            bottomText="x1.5 increase in activity"
          />
        </CardColumns>
      </Container>
    );
  }
}

export default HallOfFame;
