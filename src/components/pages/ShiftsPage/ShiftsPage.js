import React from 'react';
import axios from 'axios';
import { Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from '../../Layout/Layout';
import ShiftList from '../../ShiftList';
import authHeader from '../../../_helpers/auth-header';

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
    recommendedShifts: [
      {
        title: 'Chelsea Flower Show',
        description: 'Raising awareness for food shortage.',
        id: 444
      }
    ] // FIXME
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
      .catch(err => console.log(err)); // TODO go to error page
  }

  render() {
    const { shifts, recommendedShifts } = this.state;
    console.log(shifts);

    return (
      <Layout>
        <LinkContainer
          exact
          to="new-shift"
          style={{ position: 'sticky', left: '80%' }}
        >
          <Button variant="outline-primary">
            {<FontAwesomeIcon icon={faPlus} />} Add Shift
          </Button>
        </LinkContainer>
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
