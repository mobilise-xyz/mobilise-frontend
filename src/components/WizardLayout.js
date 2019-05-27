import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import Layout from './Layout';

const WizardLayout = ({ heading, children }) => (
  <Layout>
    <h3>{heading}</h3>
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
    <Container className="col-md-4 m-*-auto pt-1">
      <Button variant="secondary">Back</Button>
      <Button variant="primary" type="submit">
        Next
      </Button>
    </Container>
  </Layout>
);

export default WizardLayout;
