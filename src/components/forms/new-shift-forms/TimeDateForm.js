import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { DateInput, TimePicker } from '@blueprintjs/datetime';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@blueprintjs/core/lib/css/blueprint.css';

export default class TimeDateForm extends React.Component {
  submit = () => console.log('Time and Date inputted'); // TODO create submit function

  getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Container>
          <Row className="justify-content-md-left">
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Container>
                <DateInput reverseMonthAndYearMenus rightElement />
              </Container>
            </Form.Group>
          </Row>
          <Row className="justify-content-md-left">
            <Col md="auto">
              <Form.Group controlId="start-time">
                <Form.Label>Start</Form.Label>
                <Container>
                  <TimePicker />
                </Container>
              </Form.Group>
            </Col>
            <Col md="auto">
              <Form.Group controlId="end-time">
                <Form.Label>End</Form.Label>
                <Container>
                  <TimePicker />
                </Container>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }
}
