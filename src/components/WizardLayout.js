import React from 'react';
import { Carousel, Card, Button, Container, Row } from 'react-bootstrap';
import Layout from './Layout';

const WizardLayout = ({ heading, children }) => (
  <Layout>
    <h3>{heading}</h3>
    <Carousel
      controls
      indicators={false}
      wrap={false}
      keyboard={false}
      interval={null}
    >
      {children.map(c => (
        <Carousel.Item>
          <Card style={{ padding: '2rem' }}>
            <Card.Body>
              <Card.Title>{c.props.description}</Card.Title>
              {c}
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
    <Container className="col-md-2 m-*-auto pt-1">
      <Row>
        <Button variant="secondary">Back</Button>
        <Button variant="primary">Next</Button>
      </Row>
    </Container>
  </Layout>
);

export default WizardLayout;
