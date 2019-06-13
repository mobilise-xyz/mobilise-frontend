import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import './Layout.css';
import alertActions from '../../_actions/alert.actions';
import ErrorBoundary from '../ErrorBoundary';

// This class defines the layout for each page i.e. Header at the top, content in the middle.
const Layout = ({ children, alert, heading, cornerComponent, dispatch }) => (
  <ErrorBoundary>
    <div>
      <Alert
        dismissible
        onClose={() => dispatch(alertActions.clear())}
        className="text-center"
        variant={alert.type}
        show={alert.message !== undefined}
        style={{ position: 'fixed', width: '100%', zIndex: 'auto' }}
      >
        {alert.message}
      </Alert>
      {/* Use pt-5 utility class to create some space between the header and content. */}
      <Container className="pt-5 p-md-5 m-0" fluid>
        <Row>
          <Col>
            <h2>{heading}</h2>
          </Col>
          <Col style={{ textAlign: 'right', zIndex: '0' }}>
            {cornerComponent}
          </Col>
        </Row>
        {children}
      </Container>
    </div>
  </ErrorBoundary>
);

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(Layout);
