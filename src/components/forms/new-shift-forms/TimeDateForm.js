import React from 'react';
import { Form, Container, Col, Row } from 'react-bootstrap';
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
      <Form id="new-shift-form-part-2" onSubmit={this.submit}>
        <Form.Group controlId="date" className="justify-content-md-left">
          <Form.Label>Date</Form.Label>
          <Container>
            <DateInput />
          </Container>
        </Form.Group>
        <Form.Group controlId="time" className="justify-content-md-left">
          <Row>
            <Col md="auto">
              <Form.Label>Start</Form.Label>
              <Container>
                <TimePicker />
              </Container>
            </Col>
            <Col md="auto">
              <Form.Label>End</Form.Label>
              <Container>
                <TimePicker />
              </Container>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    );
  }
}
