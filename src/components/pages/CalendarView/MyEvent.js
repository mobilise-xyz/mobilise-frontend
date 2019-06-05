import React from 'react';
import { Container, Row } from 'react-bootstrap';

const MyEvent = ({ title }) => (
  <Container>
    <Row>{title}</Row>
  </Container>
);

export default MyEvent;
