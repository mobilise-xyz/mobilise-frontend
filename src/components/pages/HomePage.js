import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from '../Layout';

const HomePage = () => (
  <Layout>
    <Button variant="primary">
      <Nav className="mr-auto">
        <LinkContainer
          exact
          to="/shift-wizard"
          activeStyle={{ color: 'green' }}
        >
          <Nav.Link>Add Shift</Nav.Link>
        </LinkContainer>
      </Nav>
    </Button>
  </Layout>
);

export default HomePage;
