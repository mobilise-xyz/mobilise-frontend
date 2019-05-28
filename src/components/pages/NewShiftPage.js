import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import CardLayout from '../CardLayout';

const placeholderShiftTitles = ['Fundraiser', 'Regular'];
const placeholderRoles = ['Driver', "Driver's mate"];

class NewShiftPage extends React.Component {
  state = {
    data: {
      title: '',
      description: '',
      date: '',
      location: '',
      roles: []
    },
    shiftTitleOptions: placeholderShiftTitles,
    roleOptions: placeholderRoles
  };

  _renderToken = (option, props, index) => (
    <Token key={index} style={{}} onRemove={props.onRemove}>
      <Row>
        <Col
          md="auto"
          style={{
            padding: '0 0.2rem 0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >{`${option}`}</Col>
        <Col
          style={{
            padding: '0 1rem 0 0.2rem',
            width: '3.2rem'
          }}
        >
          <Form.Control
            type="number"
            style={{ height: '1.4rem', textAlign: 'center' }}
          />
        </Col>
      </Row>
    </Token>
  );

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ data: { [name]: value } });
  };

  handleSubmit = e => {
    // Submit this
    e.preventDefault();
  };

  handleRolesChange = s => {
    const { data } = this.state;
    const roles = data.roles.slice();
    roles.push(s);
    this.setState({ data: { roles } });
    console.log(roles);
  };

  render() {
    const { data, shiftTitleOptions: shiftTitles, roleOptions } = this.state;
    const { title, description } = data;

    return (
      <CardLayout title="New Shift">
        <Form onSubmit={this.handleSubmit}>
          {/* Title */}
          {/* TODO handle validation */}
          <Form.Group controlId="titleForm">
            <Form.Label>Shift Title</Form.Label>
            <Typeahead // TODO make async
              id="title"
              newSelectionPrefix="Add new title: "
              placeholder="Choose an event title, or create a new one"
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
              placeholder="Enter shift description"
              rows="3"
              value={description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Row>
            {/* Date */}
            <Form.Group as={Col} controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            {/* Time */}
            <Form.Group as={Col} controlId="time">
              <Row>
                <Col>
                  <Form.Label>Start</Form.Label>
                  <Form.Control type="time" />
                </Col>
                <Col>
                  <Form.Label>End</Form.Label>
                  <Form.Control type="time" />
                </Col>
              </Row>
            </Form.Group>
          </Form.Row>
          {/* Location */}
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              id="location"
              type="location"
              required
              placeholder="e.g. Imperial College London"
              onChange={this.handleChange}
            />
            {/* TODO: use google maps API & asyncTypeAhead */}
          </Form.Group>
          {/* Roles */}
          <Form.Group controlId="rolesForm">
            <Form.Label>Roles</Form.Label>
            <Typeahead // TODO make async
              renderToken={this._renderToken}
              id="roles"
              placeholder="Add available roles for shift"
              newSelectionPrefix="Add new role:  "
              options={roleOptions}
              allowNew
              multiple
              onChange={this.handleRolesChange}
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
