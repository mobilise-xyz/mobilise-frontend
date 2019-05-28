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
      startTime: '',
      endTime: '',
      location: '',
      roles: []
    },
    shiftTitleOptions: placeholderShiftTitles,
    roleOptions: placeholderRoles
  };

  async componentDidMount() {
    // Get role and shift options.
  }

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
        >
          {option.label ? option.label : option}
        </Col>
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

  handleDataChange = e => {
    console.log(this.state);
    const { name, value } = e.target;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  handleSubmit = e => {
    // Submit this
    e.preventDefault();

    console.log(this.state);
  };

  handleRolesChange = s => {
    const newElementObject = s[s.length - 1];
    const newElement = newElementObject.label
      ? newElementObject.label
      : newElementObject;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        roles: prevState.data.roles.concat(newElement)
      }
    }));
  };

  handleShiftTitleChange = s => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        title: s[0]
      }
    }));
  };

  render() {
    const { data, shiftTitleOptions, roleOptions } = this.state;
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
              name="shiftTitle"
              newSelectionPrefix="Add new title: "
              placeholder="Choose an event title, or create a new one"
              value={title}
              allowNew
              onChange={this.handleShiftTitleChange}
              options={shiftTitleOptions} // TODO
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
              onChange={this.handleDataChange}
            />
          </Form.Group>
          <Form.Row>
            {/* Date */}
            <Form.Group as={Col} controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            {/* Time */}
            <Form.Group as={Col}>
              <Row>
                <Col>
                  <Form.Label>Start</Form.Label>
                  <Form.Control
                    id="start-time"
                    name="startTime"
                    type="time"
                    onChange={this.handleDataChange}
                  />
                </Col>
                <Col>
                  <Form.Label>End</Form.Label>
                  <Form.Control
                    id="end-time"
                    name="endTime"
                    type="time"
                    onChange={this.handleDataChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form.Row>
          {/* Location */}
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              id="location"
              name="location"
              type="location"
              required
              placeholder="e.g. Imperial College London"
              onChange={this.handleDataChange}
            />
            {/* TODO: use google maps API & asyncTypeAhead */}
          </Form.Group>
          {/* Roles */}
          <Form.Group controlId="rolesForm">
            <Form.Label>Roles</Form.Label>
            <Typeahead // TODO make async & SORT OUT CSS so letters like g dont get cut off.
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
