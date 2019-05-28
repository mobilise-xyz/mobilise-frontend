import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import axios from 'axios';
import CardLayout from '../CardLayout';
import history from '../../_helpers/history';
import authHeader from '../../_helpers/auth-header';

const placeholderShiftTitles = ['Fundraiser', 'Regular'];
const placeholderRoles = ['Driver', "Driver's mate"];

class NewShiftPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  async componentDidMount() {
    // Get role and shift options.
  }

  _renderToken = (option, props, index) => (
    <Token key={index} onRemove={props.onRemove}>
      <Row>
        {/* TODO Cleanup. Perhaps use a new CSS file. */}
        <Col style={{ margin: 'auto', padding: '1rem' }}>
          {option.label ? option.label : option}
        </Col>
        <Col style={{ padding: 0, marginRight: '1rem' }}>
          <Form.Control
            type="number"
            style={{ width: '2rem', margin: 'auto' }}
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

    // TODO validation

    // TODO Get roles
    const { data } = this.state;

    const config = { headers: authHeader() };

    const postData = {
      title: data.title,
      description: data.description,
      date: data.date,
      start: data.startTime,
      stop: data.endTime,
      postcode: data.location
    };

    console.log(postData);

    axios.post('/shifts', postData, config).then(history.push('/'));
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
            <Form.Group as={Col}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="date"
                name="date"
                onChange={this.handleDataChange}
                type="date"
              />
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
