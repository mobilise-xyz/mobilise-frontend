import React from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import ShiftCard from '../ShiftCard/ShiftCard';

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
