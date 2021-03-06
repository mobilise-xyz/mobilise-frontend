import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewRoleModal from './modals/NewRoleModal';
import CardLayout from '../../CardLayout';
import authHeader from '../../../_helpers/auth-header';
import TitleForm from '../../forms/TitleForm';
import PlainTextForm from '../../forms/PlainTextForm';
import DateTimeForm from '../../forms/DateTimeForm';
import LocationInput from '../../LocationInput/LocationInput';
import RolesForm from '../../forms/RolesForm';
import RepeatingShiftForm from '../../forms/RepeatingShiftForm/RepeatingShiftForm';
import alertActions from '../../../_actions/alert.actions';
import './NewShiftPage.css';
import shiftsActions from '../../../_actions/shifts.actions';

export class UnconnectedNewShiftPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: '',
        description: '',
        date: '',
        start: '',
        stop: '',
        repeat: 'Never',
        repeatUntil: '',
        location: '',
        roles: []
      },
      shiftTitleOptions: [],
      roleOptions: [],
      newRoleModal: {
        roleName: '',
        show: false
      }
    };
  }

  async componentDidMount() {
    // Get role and shift options.
    const config = {
      headers: authHeader()
    };

    await axios
      .get('/shifts/titles', config)
      .then(({ data }) => {
        const { titles } = data;
        this.setState({
          shiftTitleOptions: titles
        });
      })
      .catch(err =>
        console.log(
          err,
          'There was a problem retrieving possible shift titles.'
        )
      );

    await axios
      .get('/roles', config)
      .then(({ data }) => {
        const { roles } = data;
        this.setState({
          roleOptions: roles.map(r => ({
            name: r.name,
            involves: r.involves
          }))
        });
      })
      .catch(err =>
        console.log(err, 'There was a problem retrieving potential roles.')
      );
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
    e.preventDefault();

    const { dispatch } = this.props;
    const { data } = this.state;

    // Map roles to role ids
    // const roleIds = data.roles.map(r => roleOptions[r]);

    // Map roles to role IDs.

    const postData = {
      title: data.title,
      description: data.description,
      date: data.date,
      start: data.start,
      stop: data.stop,
      repeatedType: data.repeat,
      untilDate: data.repeatUntil,
      address: data.location,
      rolesRequired: data.roles
    };

    dispatch(shiftsActions.create(postData));
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
    // The newest addition should always be at the end of the array.

    let newRole = s.length === 0 ? '' : s[s.length - 1];

    if (newRole.customOption) {
      newRole = newRole.label;
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

    const rolesCopy = [...roles];
    const roleToUpdate = rolesCopy.find(r => r.roleName === name);

    if (roleToUpdate) {
      roleToUpdate.number = parseInt(value, 10);
    }

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        roles: rolesCopy
      }
    }));
  };

  getRandomColour = () => {
    const colours = ['5F0F40', '397367', 'FF5454', '274690', '20BF55'];
    return `#${colours[Math.floor(Math.random() * colours.length)]}`;
  };

  handleRoleSubmit = roleInvolves => {
    const config = {
      headers: authHeader()
    };

    const { newRoleModal } = this.state;
    const { roleName } = newRoleModal;

    const data = {
      name: roleName,
      involves: roleInvolves,
      colour: this.getRandomColour()
    };

    // 1. Create new role with post request
    axios
      .post('/roles', data, config)
      .then(({ data: respData }) => {
        const { role } = respData;
        // 2. Add to role options
        this.setState(prevState => {
          const newOptions = prevState.roleOptions.slice();
          newOptions.push({
            name: role.name,
            involves: role.involves
          });
          return {
            roleOptions: newOptions
          };
        });
      })
      .catch(alertActions.error('Adding a role failed!'));

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
    const { title, description, repeat, date, start, stop, roles } = data;
    const { roleName, show: showRoleModal } = newRoleModal;

    return (
      <CardLayout title="New Shift" backButton container>
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
          <PlainTextForm
            className="description-form"
            id="description"
            label="description"
            name="description"
            content={description}
            handleChange={this.handleDataChange}
          />
          {/* Date and Time */}
          <DateTimeForm
            id="datetime"
            date={date}
            startTime={start}
            endTime={stop}
            handleChange={this.handleDataChange}
          />
          {/* Repeating Shifts */}
          <RepeatingShiftForm
            id="repeat"
            repeat={repeat}
            handleChange={this.handleDataChange}
            startDate={date}
          />
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
              type="submit"
              className="btn-confirm"
              block
            >
              Confirm Shift
            </Button>
          </div>
        </Form>
        <NewRoleModal
          roleName={roleName}
          show={showRoleModal}
          onHide={this.toggleRolesModal}
          handleRoleSubmit={this.handleRoleSubmit}
          handleRoleCancel={this.handleRoleCancel}
        />
      </CardLayout>
    );
  }
}

export default connect()(UnconnectedNewShiftPage);
