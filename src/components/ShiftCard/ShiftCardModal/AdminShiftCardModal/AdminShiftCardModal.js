import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonToolbar,
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Row
} from 'react-bootstrap';
import '../../ShiftCard.css';
import './AdminShiftCardModal.css';
import AdjustableRoleBadge from '../AdjustableRoleBadge';
import PlainTextForm from '../../../forms/PlainTextForm';
import shiftsActions from '../../../../_actions/shifts.actions';
import DateTimeForm from '../../../forms/DateTimeForm';

class AdminShiftCardModal extends Component {
  constructor(props) {
    super(props);
    const { shiftData } = this.props;

    this.state = {
      title: shiftData.title,
      description: shiftData.description,
      address: shiftData.address,
      start: shiftData.start,
      stop: shiftData.stop,
      date: shiftData.date,
      manager: shiftData.creator.user,
      requirements: shiftData.requirements
    };
  }

  handleSubmit = () => {
    // TODO handle date, time, manager, etc
    const {
      title,
      description,
      start,
      stop,
      address,
      requirements
    } = this.state;
    const { shiftData, onHide, dispatch } = this.props;

    // 1. Convert requirements to rolesRequired
    const rolesRequired = requirements.map(r => ({
      roleName: r.role.name,
      number: r.numberRequired
    }));

    // 2. Construct payload
    const data = {
      title,
      description,
      address,
      start,
      stop,
      rolesRequired
    };

    // 3. Submit PUT to update information.
    dispatch(shiftsActions.update(shiftData.id, data));

    // 4. Close modal
    onHide();
  };

  handleCancel = () => {
    const { shiftData, onHide } = this.props;

    // 1. Hide
    onHide();

    // 2. Reset data
    this.setState({
      title: shiftData.title,
      description: shiftData.description,
      address: shiftData.address,
      start: shiftData.start,
      stop: shiftData.stop,
      date: shiftData.date,
      manager: shiftData.creator.user,
      requirements: shiftData.requirements
    });
  };

  handleRoleNumberChange = (name, newNumber) => {
    const { requirements } = this.state;

    const roleToUpdateIndex = requirements.findIndex(r => r.role.name === name);

    const newRole = {
      ...requirements[roleToUpdateIndex],
      numberRequired: newNumber
    };

    const requirementsCopy = requirements.slice();
    requirementsCopy[roleToUpdateIndex] = newRole;

    this.setState({
      requirements: requirementsCopy
    });
  };

  handleDataChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handlePing = () => {
    const { shiftData, dispatch } = this.props;

    dispatch(shiftsActions.ping(shiftData.id));
  };

  render() {
    const {
      title,
      description,
      address,
      start,
      stop,
      date,
      manager,
      requirements
    } = this.state;
    const { shiftData, show, handleDelete } = this.props;

    return (
      <Modal show={show} onHide={this.handleCancel} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <PlainTextForm
              noLabel
              name="title"
              content={title}
              handleChange={this.handleDataChange}
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={12}>
              <Row className="pb-2" noGutters>
                <Col xs={1} className="icon-col" style={{ margin: 'auto' }}>
                  <i className="material-icons">calendar_today</i>
                </Col>
                <Col>
                  <DateTimeForm
                    noLabel
                    startTime={start}
                    endTime={stop}
                    date={date}
                    handleChange={this.handleDataChange}
                  />
                </Col>
              </Row>
              <Row className="pb-2" noGutters>
                <Col xs={1} className="icon-col">
                  <i className="material-icons">location_on</i>
                </Col>
                <Col>
                  <PlainTextForm
                    id="address-form"
                    name="address"
                    noLabel
                    handleChange={this.handleDataChange}
                    content={address}
                  />
                </Col>
              </Row>
              <Row className="pb-2">
                <Col xs={1} className="icon-col">
                  <i className="material-icons">perm_contact_calendar</i>
                </Col>
                <Col>
                  <PlainTextForm
                    noLabel
                    handleChange={this.handleDataChange}
                    content={`${manager.firstName}  ${manager.lastName}`}
                  />
                </Col>
              </Row>
              <Row className="pb-4">
                <Col xs={1} className="icon-col">
                  <i className="material-icons">info</i>
                </Col>
                <Col>
                  {' '}
                  <PlainTextForm
                    id="description-form"
                    noLabel
                    name="description"
                    handleChange={this.handleDataChange}
                    content={description}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Roles on this shift</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              {requirements.map(r => (
                <AdjustableRoleBadge
                  key={shiftData.id + r.role.name}
                  isAdmin
                  roleName={r.role.name}
                  volunteerNames={r.bookings.map(
                    b =>
                      `${b.volunteer.user.firstName} ${
                        b.volunteer.user.lastName
                      }`
                  )}
                  number={r.numberRequired}
                  handleUpdate={this.handleRoleNumberChange}
                  onModal
                  colour={r.role.colour}
                />
              ))}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="mr-2"
            variant="outline-danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <ButtonToolbar role="toolbar">
            <DropdownButton
              title="Ping"
              variant="outline-secondary"
              style={{ marginRight: '0.5rem' }}
            >
              <Dropdown.Item onClick={this.handlePing}>
                All available volunteers
              </Dropdown.Item>
            </DropdownButton>

            <Button
              variant="outline-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Save changes
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { shift } = state;
  return {
    shift
  };
}

export default connect(mapStateToProps)(AdminShiftCardModal);
