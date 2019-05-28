import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Layout from './Layout';

const WizardLayout = ({ heading, children }) => (
  <Layout>
    <h3>{heading}</h3>
    {children.map(c => (
      <Card>
        <Card.Body>
          <Card.Title>{c.title}</Card.Title>
          {c}
        </Card.Body>
      </Card>
    ))}
    <Card>
      <Card.Body>
        <Button variant="primary">Confirm Shift</Button>
      </Card.Body>
    </Card>
  </Layout>
);

export default WizardLayout;
