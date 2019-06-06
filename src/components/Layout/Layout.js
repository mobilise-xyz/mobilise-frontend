import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import Header from '../Header';

import './Layout.css';
import alertActions from '../../_actions/alert.actions';

// This class defines the layout for each page i.e. Header at the top, content in the middle.
const Layout = ({
  navOff,
  children,
  alert,
  heading,
  cornerComponent,
  dispatch
}) => (
  <div>
    {navOff ? null : <Header />}
    <Alert
      dismissible
      onClose={() => dispatch(alertActions.clear())}
      className="text-center"
      variant={alert.type}
      show={alert.message !== undefined}
    >
      {alert.message}
    </Alert>
    {/* Use pt-5 utility class to create some space between the header and content. */}
    <Container className="p-5">
      <Row>
        <Col>
          <h2>{heading}</h2>
        </Col>
        <Col style={{ textAlign: 'right' }}>{cornerComponent}</Col>
      </Row>
      {children}
    </Container>
  </div>
);

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(Layout);
