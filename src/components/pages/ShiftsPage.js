import React from 'react';
import axios from 'axios';
import { ListGroup, Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from '../Layout';
import ShiftCard from '../ShiftCard';

class ShiftsPage extends React.Component {
  state = {
    cards: []
  };

  // TODO Handle exception properly.
  // TODO Set correct API endpoint.
  async componentDidMount() {
    await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(r => this.setState({ cards: r.data }))
      .catch(() => console.log('Something went wrong!'));
  }

  render() {
    const { cards } = this.state;

    return (
      <Layout>
        <Button variant="primary">
          <Nav className="mr-auto">
            <LinkContainer
              exact
              to="/new-shift"
              activeStyle={{ color: 'green' }}
            >
              <Nav.Link>Add Shift</Nav.Link>
            </LinkContainer>
          </Nav>
        </Button>
        <ListGroup>
          {cards.map(c => (
            <ListGroup.Item key={c.id} className="border-0">
              <ShiftCard title={c.title}>{c.body}</ShiftCard>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Layout>
    );
  }
}
export default ShiftsPage;
