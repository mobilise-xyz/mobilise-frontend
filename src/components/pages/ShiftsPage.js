import React from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import ShiftList from '../ShiftList';
import authHeader from '../../_helpers/auth-header';

class ShiftsPage extends React.Component {
  state = {
    shifts: [
      {
        id: -1,
        title: 'Loading...',
        description: (
          <div style={{ textAlign: 'center' }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )
      }
    ],
    recommendedShifts: [{ title: 'test', description: 'Test', id: 444 }] // FIXME
  };

  // TODO Handle exception properly.
  // TODO Set correct API endpoint.
  async componentDidMount() {
    // Get all shifts
    const config = {
      headers: authHeader()
    };

    await axios
      .get('/shifts', config)
      .then(r => this.setState({ shifts: r.data }))
      .catch(() => console.log('Something went wrong!'));
  }

  render() {
    const { shifts, recommendedShifts } = this.state;

    return (
      <Layout>
        <ShiftList
          heading={<DateHeading weekday="Recommended" />}
          shifts={recommendedShifts}
          // TODO what is this color
          cardStyle={{ backgroundColor: 'green' }}
        />
        {/* TODO divider between each day */}
        <hr />
        {/* TODO remove hardcoding */}
        <ShiftList
          heading={<DateHeading weekday="Today" date="17th March" />}
          shifts={shifts}
        />
      </Layout>
    );
  }
}

const DateHeading = ({ weekday, date }) => (
  <>
    <h3>{weekday}</h3>
    <p>{date}</p>
  </>
);
export default ShiftsPage;
