import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import Layout from '../Layout/Layout';

const NotFound = () => (
  <Layout>
    <Row>
      <Col style={{ 'text-align': 'center' }}>
        <Image src={logo} alt="Mobilise logo" fluid />
      </Col>
    </Row>
    <Row className="pt-5">
      <Col style={{ textAlign: 'center' }}>
        This is not the page you are looking for.
      </Col>
    </Row>
  </Layout>
);

export default NotFound;
