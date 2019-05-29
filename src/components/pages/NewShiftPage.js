import React from 'react';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import NewRoleModal from './NewRoleModal';
import CardLayout from '../CardLayout';
import history from '../../_helpers/history';
import authHeader from '../../_helpers/auth-header';
import TitleForm from '../forms/TitleForm';
import DescriptionForm from '../forms/DescriptionForm';
import DateTimeForm from '../forms/DateTimeForm';

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
      roleOptions: [],
      newRoleModal: {
        roleName: '',
        roleInvolves: '',
        show: false
      }
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
  }

  _renderToken = (option, props, index) => (
    <Token key={index} onRemove={props.onRemove}>
      <Row onMouseDown={console.log}>
        <Col
          md="auto"
          style={{
            padding: '0 0.2rem 0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {option.customOption ? option.label : option}
        </Col>
        <Col
          style={{
            padding: '0 1rem 0 0.2rem',
            width: '3.2rem'
          }}
        >
          <Form.Control
            data-index={index}
            type="number"
            min="1"
            onChange={this.handleRoleNumber}
            style={{ height: '1.4rem', textAlign: 'center' }}
          />
        </Col>
        {/* Update role with index=index with number. */}
      </Row>
    </Token>
  );

  handleRoleNumber = e => {
    console.log(e.currentTarget.props);
  };

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
    console.log(data);

    // Map roles to role ids
    // const roleIds = data.roles.map(r => roleOptions[r]);

    // Map roles to role IDs.

    // If it as existing role, it needs to be mapped to the ID of one of the roleOptions.
    const roles = data.roles.map(role => ({
      roleId: roleOptions.find(item => item.name === role.name).id,
      number: role.number
    }));

    const config = { headers: authHeader() };

    const postData = {
      title: data.title,
      description: data.description,
      date: data.date,
      start: data.startTime,
      stop: data.endTime,
      postcode: data.location,
      rolesRequired: roles
    };

    axios.post('/shifts', postData, config).then(history.push('/'));
  };

  toggleRolesModal = () =>
    this.setState(({ newRoleModal }) => ({
      newRoleModal: {
        roleName: newRoleModal.roleName,
        show: !newRoleModal.show
      }
    }));

  handleRolesChange = s => {
    // s is the array of roles currently in the box.
    // If we have a new role, we need to open a modal.
    if (s.length !== 0) {
      // The newest addition should always be at the end of the array.
      const newRole = s[s.length - 1];
      if (newRole.customOption) {
        // Open modal to add a new role.
        this.setState(prevState => ({
          newRoleModal: { roleName: newRole.label.trim(), show: prevState.show }
        }));
        this.toggleRolesModal();
      }
    }
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        roles: s
      }
    }));
  };

  handleRoleSubmit = () => {
    const config = {
      headers: authHeader()
    };

    const { newRoleModal } = this.state;
    const { roleName, roleInvolves } = newRoleModal;

    const data = {
      name: roleName,
      involves: roleInvolves
    };
    // 1. Create new role with post request
    axios
      .post('/roles', data, config)
      .then(({ data: respData }) =>
        // 2. Add to role options
        this.setState(prevState => {
          const newOptions = prevState.roleOptions.push({
            name: respData.name,
            involves: respData.involves
          });

          return {
            newOptions
          };
        })
      )
      .catch(console.log('OH NO'));

    // 3. Close modal
    this.toggleRolesModal();
  };

  handleDescriptionChange = e => {
    this.setState(prevState => ({
      newRoleModal: {
        ...prevState.data,
        description: e.target.value
      }
    }));
  };

  handleRoleCancel = () => {
    // 1. Close modal
    this.toggleRolesModal();
    // 2. Remove new role

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        roles: prevState.data.roles.pop()
      }
    }));
  };

  handleShiftTitleChange = s => {
    const newElementObject = s[0];
    const newElement = newElementObject.customOption
      ? newElementObject.label
      : newElementObject;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        title: newElement
      }
    }));
  };

  render() {
    const { data, shiftTitleOptions, roleOptions, newRoleModal } = this.state;
    const { title, description } = data;
    const { roleName, show } = newRoleModal;

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
          <Form.Group controlId="rolesForm">
            <Form.Label>Roles</Form.Label>
            <Typeahead // TODO make async & SORT OUT CSS so letters like g dont get cut off.
              renderToken={this._renderToken}
              id="roles"
              placeholder="Add available roles for shift"
              newSelectionPrefix="Add new role:  "
              options={roleOptions.map(r => r.name)}
              allowNew
              multiple
              onChange={this.handleRolesChange}
              selectHintOnEnter
              onActiveItemChange={s => console.log(s)}
            />
          </Form.Group>
          {/* Button boi */}
          <div className="text-center" style={{ margin: 'auto' }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        <NewRoleModal
          roleName={roleName}
          show={show}
          onHide={this.toggleRolesModal}
          handleRoleSubmit={this.handleRoleSubmit}
          handleRoleCancel={this.handleRoleCancel}
        />
      </CardLayout>
    );
  }
}

export default NewShiftPage;
