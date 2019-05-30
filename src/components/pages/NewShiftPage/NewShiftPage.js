import React from 'react';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import NewRoleModal from '../NewRoleModal';
import CardLayout from '../../CardLayout';
import history from '../../../_helpers/history';
import authHeader from '../../../_helpers/auth-header';
import TitleForm from '../../forms/TitleForm';
import DescriptionForm from '../../forms/DescriptionForm';
import DateTimeForm from '../../forms/DateTimeForm';
import LocationInput from '../../LocationInput/LocationInput';
import './NewShiftPage.css';

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
      .then(({ data }) =>
        this.setState({
          roleOptions: data.map(r => ({ name: r.name, involves: r.involves }))
        })
      )
      .catch(err => console.log(err, 'There was a problem.'));
  }

  _renderToken = (option, props, index) => (
    <Token key={index} onRemove={props.onRemove}>
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
          {option.customOption ? option.label : option}
        </Col>
        <Col
          style={{
            padding: '0 1rem 0 0.2rem',
            width: '3.5rem'
          }}
        >
          <Form.Control
            name={option}
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
    // Find the role name in roles, and then set the corresponding role
    // number.
    const { name, value } = e.target;

    const { data } = this.state;
    const { roles } = data;

    const roleToUpdate = roles.find(r => r.name === name);
    if (roleToUpdate) {
      roleToUpdate.number = value;
    }
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

    const { data, roles } = this.state;

    // Map roles to role ids
    // const roleIds = data.roles.map(r => roleOptions[r]);

    // Map roles to role IDs.

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
    console.dir(this.state);
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
      let newRole = s[s.length - 1];

      if (newRole.customOption) {
        newRole = newRole.label;
        // Open modal to add a new role.
        this.setState(prevState => ({
          newRoleModal: { roleName: newRole.trim(), show: prevState.show }
        }));
        this.toggleRolesModal();
      }
    }

    // When a new role is added, its initial number is 0.
    // Map existing roles with their numbers. If a role has been deleted, it is not in this list.
    this.setState(prevState => {
      const { data: prevData } = prevState;
      const { roles: prevRoles } = prevData;

      // Map the roles that already exist
      const newRoles = [];
      if (prevRoles.length !== 0) {
        // newRoles = s.map(name => prevRoles.find(p => p.name === name));
        s.forEach(name => {
          const toBeAdded = prevRoles.find(p => p.name === name);
          if (toBeAdded) {
            newRoles.push(toBeAdded);
          }
        });
      }

      if (prevRoles.length < s.length) {
        // Then a new role has been added.
        // Add the new role.
        newRoles.push({
          name: s[s.length - 1],
          number: 0
        });
      }

      return {
        data: {
          ...prevState.data,
          roles: newRoles
        }
      };
    });
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
          const newOptions = prevState.roleOptions.slice();
          newOptions.push({
            name: respData.name,
            involves: respData.involves
          });
          return {
            roleOptions: newOptions
          };
        })
      )
      .catch(err => console.log(err));

    // 3. Close modal
    this.toggleRolesModal();

    // 4. Reset state
    this.setState(prevState => ({
      ...prevState,
      newRoleModal: {}
    }));
  };

  handleRoleCancel = () => {
    // 1. Close modal
    this.toggleRolesModal();
    // 2. Remove new role

    this.setState(({ data: prevData }) => {
      const prevRoles = prevData.roles.slice();
      prevRoles.pop();
      console.log(prevRoles);
      return {
        data: {
          ...prevData,
          roles: prevRoles
        }
      };
    });
  };

  handleShiftTitleChange = s => {
    let newTitle = '';
    if (s.length !== 0) {
      const newElementObject = s[0];
      newTitle = newElementObject.customOption
        ? newElementObject.label
        : newElementObject;
    }

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        title: newTitle
      }
    }));
  };

  render() {
    const { data, shiftTitleOptions, roleOptions, newRoleModal } = this.state;
    const { title, description, roles } = data;
    const { roleName, roleInvolves, show } = newRoleModal;

    const backBtn = (
      <LinkContainer exact to="/" style={{ position: 'sticky', left: '80%' }}>
        <Button variant="outline-secondary">
          {<FontAwesomeIcon icon={faAngleLeft} />} Back
        </Button>
      </LinkContainer>
    );

    return (
      <CardLayout title="New Shift" backBtn={backBtn}>
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
          <LocationInput handleChange={this.handleDataChange} />
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
              selected={roles.map(r => r.name)}
              selectHintOnEnter
              onActiveItemChange={s => console.log(s)}
            />
          </Form.Group>
          {/* Button boi */}
          <div className="text-center" style={{ margin: 'auto' }}>
            <Button variant="outline-primary" type="submit" block>
              Confirm Shift
            </Button>
          </div>
        </Form>
        <NewRoleModal
          roleName={roleName}
          roleInvolves={roleInvolves}
          show={show}
          onHide={this.toggleRolesModal}
          handleRoleSubmit={this.handleRoleSubmit}
          handleRoleCancel={this.handleRoleCancel}
          handleInvolvesChange={this.handleInvolvesChange}
        />
      </CardLayout>
    );
  }
}

export default NewShiftPage;
