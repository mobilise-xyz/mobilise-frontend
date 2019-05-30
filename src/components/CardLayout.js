import React from 'react';
import { Card } from 'react-bootstrap';
import Layout from './Layout';

const CardLayout = ({ title, navOff, backBtn, children }) => (
  <Layout navOff={navOff}>
    {backBtn}
    <Card.Title>{title}</Card.Title>
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  </Layout>
);

export default CardLayout;
