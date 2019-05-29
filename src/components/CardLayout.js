import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';

const CardLayout = ({ title, navOff, children }) => (
  <Layout navOff={navOff}>
    <LinkContainer exact to="/" style={{ position: 'sticky', left: '80%' }}>
      <Button variant="outline-secondary">
        {<FontAwesomeIcon icon={faAngleLeft} />} Back
      </Button>
    </LinkContainer>
    <Card.Title>{title}</Card.Title>
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  </Layout>
);

export default CardLayout;
