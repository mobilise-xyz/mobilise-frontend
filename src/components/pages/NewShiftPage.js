import React from 'react';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { DateInput, TimePicker } from '@blueprintjs/datetime';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import CardLayout from '../CardLayout';

class NewShiftPage extends React.Component {
  state = {
    data: {
      title: '',
      description: '',
      date: '',
      location: '',
      roles: []
    },
    shiftTitles: ['Fundraiser', 'Regular']
  };

  _renderToken = (option, props, index) => {
    return (
      <Token key={index} onRemove={props.onRemove}>
        {`${option}\t`}
        {/* CREATES WARNING WHEN NUMBER ALTERED <NumericInput min={0} max={100} size={1} /> */}
      </Token>
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ data: { [name]: value } });
  };

  handleSubmit = e => {
    // Submit this
    console.log(e);
  };

  render() {
    const { data, shiftTitles } = this.state;
    const { title, description } = data;

    return (
      <CardLayout title="New Shift">
        <Form handleSubmit={this.handleSubmit}>
          {/* Title */}
          {/* TODO handle validation */}
          <Form.Group controlId="titleForm">
            <Form.Label>Shift Title</Form.Label>
            <Typeahead // TODO make async
              id="title"
              placeholder="Choose an event Title, or create a new one"
              value={title}
              allowNew
              onChange={s => this.setState({ data: { title: s } })}
              options={shiftTitles} // TODO
            />
          </Form.Group>
          {/* Description */}
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              id="description"
              name="description"
              as="textarea"
              rows="3"
              value={description}
              onChange={this.handleChange}
            />
          </Form.Group>
          {/* Date */}
          <Form.Group controlId="date" className="justify-content-md-left">
            <Form.Label>Date</Form.Label>
            <Container>
              <DateInput />
            </Container>
          </Form.Group>
          {/* Time */}
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
          {/* Location */}
          <Form.Group controlId="locationForm">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="location"
              placeholder="e.g. Imperial College London"
            />
            {/* TODO: use google maps API & asyncTypeAhead */}
          </Form.Group>
          {/* Roles */}
          <Form.Group controlId="rolesForm">
            <Form.Label>Roles</Form.Label>
            <Typeahead // TODO make async
              renderToken={this._renderToken}
              id="Roles"
              bodyContainer
              clearButton
              placeholder="Add available roles for shift"
              options={["driver's mate", 'warehouse assistant']}
              allowNew
              multiple
            />
          </Form.Group>
          {/* Button boi */}
          <div className="text-center" style={{ margin: 'auto' }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardLayout>
    );
  }
}
export default NewShiftPage;
