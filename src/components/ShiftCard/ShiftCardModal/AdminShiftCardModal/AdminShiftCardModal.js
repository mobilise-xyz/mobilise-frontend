import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../ShiftCard.css';
import './AdminShiftCardModal.css';
import RoleBadge from '../RoleBadge';
import authHeader from '../../../../_helpers/auth-header';
import utils from '../../../../_helpers/utils';
import PlainTextForm from '../../../forms/PlainTextForm';

class AdminShiftCardModal extends Component {
  constructor(props) {
    super(props);
    const { shiftData } = this.props;
    this.state = {
      data: {
        title: shiftData.title,
        description: shiftData.description,
        location: shiftData.address
      },
      requirements: shiftData.requirements,
      dataChanged: false,
      rolesChanged: false
    };
  }

  handleSubmit = e => {
    // Prevent no changes being made.
    e.preventDefault();
    const { data, requirements, rolesChanged, dataChanged } = this.state;
    const { shiftData, onHide } = this.props;
    const config = { headers: authHeader() };

    if (rolesChanged) {
      this.handleRolesChangeSubmit(requirements, shiftData.id, config);
    }
    if (dataChanged) {
      this.handleDataChangeSubmit(data, shiftData.id, config);
    }

    onHide();
  };

  handleRolesChangeSubmit = (requirements, shiftId, config) => {
    const putData = {
      rolesRequired: requirements.map(r => ({
        roleName: r.role.name,
        number: r.numberRequired
      }))
    };

    axios
      .put(`/shifts/${shiftId}/rolesRequired`, putData, config)
      .then(resp => {
        utils.handleResponse(resp);
      });
  };

  handleDataChangeSubmit = (data, shiftId, config) => {
    const putData = {};

    axios
      .put(`/shifts/${shiftId}/rolesRequired`, putData, config)
      .then(resp => {
        utils.handleResponse(resp);
      });
  };

  handleCancel = () => {
    const { onHide } = this.props;
    this.setState({
      // TODO: use prevstate
      requirements: this.originalRequirements
    });
    onHide();
  };

  handleRoleNumberChange = (name, newNumber) => {
    const { shiftData } = this.props;

    const requirementsCopy = [...shiftData.requirements];
    const roleToUpdate = requirementsCopy.find(r => r.role.name === name);

    if (roleToUpdate) {
      roleToUpdate.numberRequired = newNumber;
    }

    this.setState({
      requirements: requirementsCopy,
      rolesChanged: true
    });
  };

  handleDataChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value
      },
      dataChanged: true
    }));
  };

  render() {
    const { data } = this.state;
    const { title, description, location } = data;
    const { shiftData, onHide, show, handleDelete } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header>
          <Modal.Title>
            <PlainTextForm
              noLabel
              label="title"
              content={title}
              handleChange={this.handleDataChange}
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Row>
                  <Col>
                    <PlainTextForm
                      label="description"
                      content={description}
                      handleChange={this.handleDataChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="no-form">
                    <h6>Date</h6>
                    {shiftData.date}
                  </Col>
                </Row>
                <Row>
                  <Col className="no-form">
                    <h6>Time</h6>
                    {moment(shiftData.start, 'H:m:ss')
                      .local()
                      .format('h:mm a')}{' '}
                    -
                    {moment(shiftData.stop, 'H:m:ss')
                      .local()
                      .format('h:mm a')}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PlainTextForm
                      label="managed by"
                      disabled
                      content={`${shiftData.creator.user.firstName} ${
                        shiftData.creator.user.lastName
                      }`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PlainTextForm
                      label="location"
                      content={location}
                      handleChange={this.handleDataChange}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h6>Roles on this shift</h6>
                </Col>
              </Row>
              {shiftData.requirements.map(r => (
                <Row key={shiftData.id + r.role.name}>
                  <Col key={shiftData.id + r.role.name}>
                    <RoleBadge
                      key={shiftData.id + r.role.name}
                      isAdmin
                      name={r.role.name}
                      number={r.numberRequired}
                      handleUpdate={this.handleRoleNumberChange}
                      onModal
                      colour={r.role.colour}
                    />
                  </Col>
                </Row>
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
            Delete {<FontAwesomeIcon icon={faTrash} />}
          </Button>
          <ButtonToolbar role="toolbar">
            <Button
              className="mr-2"
              variant="outline-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
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

export default AdminShiftCardModal;
