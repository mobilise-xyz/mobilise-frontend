import React from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import CardLayout from '../CardLayout';
import history from '../../_helpers/history';
import authHeader from '../../_helpers/auth-header';
import TitleForm from '../forms/TitleForm';
import DescriptionForm from '../forms/DescriptionForm';
import DateTimeForm from '../forms/DateTimeForm';
import RolesForm from '../forms/RolesForm';

const placeholderShiftTitles = ['Fundraiser', 'Regular'];

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
      shiftTitleOptions: placeholderShiftTitles, // FIXME
      roleOptions: []
    };
  }

  async componentDidMount() {
    // Get role and shift options.
    const config = {
      headers: authHeader()
    };

    axios
      .get('/roles', config)
      .then(response => this.setState({ roleOptions: response.data }))
      .catch(err => console.log(err, 'There was a problem.'));

    console.log(this.state);
  }

  handleDataChange = e => {
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

    const { data, roleOptions } = this.state;

    // Map roles to role ids
    // const roleIds = data.roles.map(r => roleOptions[r]);

    // Map roles to role IDs.
    const roleIds = data.roles.map(
      roleName => roleOptions.find(item => item.name === roleName).id
    );

    const config = { headers: authHeader() };

    const postData = {
      title: data.title,
      description: data.description,
      date: data.date,
      start: data.startTime,
      stop: data.endTime,
      postcode: data.location,
      roles: roleIds
    };

    axios.post('/shifts', postData, config).then(history.push('/'));
  };

  // TODO: @Joon doesn't handle deletion of roles
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
          <TitleForm
            title={title}
            shiftTitleOptions={shiftTitleOptions}
            handleChange={this.handleShiftTitleChange}
          />
          {/* Description */}
          <DescriptionForm
            description={description}
            handleChange={this.handleDataChange}
          />
          {/* Date and Time */}
          <DateTimeForm handleChange={this.handleDataChange} />
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
          <RolesForm
            roleOptions={roleOptions}
            handleChange={this.handleRolesChange}
          />
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
