import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
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
import RolesForm from '../../forms/RolesForm';
import RepeatingShiftForm from '../../forms/RepeatingShiftForm/RepeatingShiftForm';

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
        repeat: 1,
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

  handleDataChange = e => {
    const { name, value } = e.target;
    console.log('UPDATE', name, 'TO', value);
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  handleRepeatSelect = n => {
    this.setState({
      repeat: n
    });
  };

  handleSubmit = e => {
    // Submit this
    e.preventDefault();

    console.log('State on submit', this.state);

    // TODO validation

    const { data } = this.state;

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
      repeat: data.repeat,
      address: data.location,
      rolesRequired: data.roles
    };
    axios.post('/shifts', postData, config).then(resp => {
      console.log('resp', resp);
      history.push('/');
    });
    // TODO success toast here.
    console.log('postData', postData);
  };

  toggleRolesModal = () =>
    this.setState(({ newRoleModal }) => ({
      newRoleModal: {
        roleName: newRoleModal.roleName,
        show: !newRoleModal.show
      }
    }));

  handleRolesChange = s => {
    console.log('HANDLE ROLES CHANGE');
    // s is the array of roles currently in the box.
    // If we have a new role, we need to open a modal.
    // The newest addition should always be at the end of the array.

    let newRole = s.length === 0 ? '' : s[s.length - 1];

    if (newRole.customOption) {
      newRole = newRole.label;
      console.log(newRole);
      // Open modal to add a new role.
      this.setState(prevState => ({
        newRoleModal: { roleName: newRole.trim(), show: prevState.show }
      }));
      this.toggleRolesModal();
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
          const toBeAdded = prevRoles.find(
            p => p.roleName === (name.customOption ? name.label : name)
          );
          if (toBeAdded) {
            newRoles.push(toBeAdded);
          }
        });
      }

      if (prevRoles.length < s.length) {
        // Then a new role has been added.
        // Add the new role.
        newRoles.push({
          roleName: newRole,
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

  handleRoleNumber = e => {
    // Find the role name in roles, and then set the corresponding role
    // number.
    const { name, value } = e.target;

    const { data } = this.state;
    const { roles } = data;

    const rolesCopy = roles.slice();
    const roleToUpdate = rolesCopy.find(r => r.roleName === name);

    if (roleToUpdate) {
      roleToUpdate.number = parseInt(value, 10);
    }

    console.log('name', name);
    console.log('value', value);
    // console.log('roleToUpdate', roleToUpdate);
    console.log('UPDATED ROLES', roles);

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        roles: rolesCopy
      }
    }));
  };

  getRandomColour = () =>
    `# ${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;

  handleRoleSubmit = () => {
    const config = {
      headers: authHeader()
    };

    const { newRoleModal } = this.state;
    const { roleName, roleInvolves } = newRoleModal;

    const data = {
      name: roleName,
      involves: roleInvolves,
      colour: this.getRandomColour()
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

    // 4. Reset state of role modal
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
      console.log('prevRoles', prevRoles);
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
    console.log('STATE', this.state);
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
            id="title"
            title={title}
            shiftTitleOptions={shiftTitleOptions}
            handleChange={this.handleShiftTitleChange}
          />
          {/* Description */}
          <DescriptionForm
            id="description"
            description={description}
            handleChange={this.handleDataChange}
          />
          {/* Date and Time */}
          <DateTimeForm id="datetime" handleChange={this.handleDataChange} />
          {/* Repeating Shifts */}
          <Form.Label>Repeat</Form.Label>
          <RepeatingShiftForm handleChange={this.handleRepeatSelect} />
          {/* Location */}
          <LocationInput id="location" handleChange={this.handleDataChange} />
          {/* Roles */}
          <RolesForm
            roles={roles}
            roleOptions={roleOptions}
            handleChange={this.handleRolesChange}
            handleRoleNumber={this.handleRoleNumber}
          />
          {/* Button boi */}
          <div className="text-center" style={{ margin: 'auto' }}>
            <Button
              id="submitbutton"
              variant="outline-primary"
              type="submit"
              block
            >
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
