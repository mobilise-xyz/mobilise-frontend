import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Layout from './Layout';

const CardLayout = ({ title, navOff, backBtn, children }) => (
  <Layout navOff={navOff}>
    <Row>
      <Col>{backBtn}</Col>
    </Row>
    <Row>
      <Col>
        <Card.Title>{title}</Card.Title>
        <Card>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Col>
    </Row>
  </Layout>
);

export default CardLayout;
