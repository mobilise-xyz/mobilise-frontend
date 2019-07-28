import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Layout from '../../Layout/Layout';
import './HomePage.css';

class HomePage extends React.Component {
  componentDidMount() {
    document.body.className = 'welcome-body';
  }

  componentWillUnmount() {
    document.body.className = '';
  }

  render() {
    return (
      <Layout className="welcome-page-layout">
        <Container>
          <Card>
            <Card.Body>
              <Card.Text>Welcome to Mobilise!</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Youre looking at the gateway to a smart Volunteer Coordination
                Application. Interested in Volunteering for one of our supported
                charities? Hit sign up and start helping the community today!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Mobilise was built and developed by 4 Computing Students in
                their 2nd year at Imperial College London alongside the help of
                the staff and volunteers of City Harvest London.
              </Card.Text>
            </Card.Body>
          </Card>
          <Container className="pt-5 text-center"></Container>
        </Container>
      </Layout>
    );
  }
}

export default HomePage;
