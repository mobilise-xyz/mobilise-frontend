import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Layout from './Layout';

const CardLayout = ({
  title,
  navOff,
  backButton,
  children,
  container = false
}) => {
  const backBtn = backButton ? (
    <Row>
      <Col>
        <LinkContainer exact to="/" className="float-right">
          <Button variant="outline-secondary">
            {<FontAwesomeIcon icon={faAngleLeft} />} Back
          </Button>
        </LinkContainer>
      </Col>
    </Row>
  ) : null;

  const inner = (
    <>
      {backBtn}
      <Row>
        <Col>
          <Card.Title>{title}</Card.Title>
          <Card>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  return (
    <Layout navOff={navOff}>
      {container ? <Container>{inner}</Container> : inner}
    </Layout>
  );
};

export default CardLayout;
