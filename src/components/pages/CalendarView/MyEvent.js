import React from 'react';
import { Container, Row } from 'react-bootstrap';

const MyEvent = ({ title }) => {
  return (
    <Container>
      <Row>{title}</Row>
    </Container>
  );
};

export default MyEvent;
