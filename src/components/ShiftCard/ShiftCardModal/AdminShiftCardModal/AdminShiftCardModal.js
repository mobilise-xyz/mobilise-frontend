import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Col, Form, Modal, Row } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../ShiftCard.css';
import './AdminShiftCardModal.css';
import AdjustableRoleBadge from '../AdjustableRoleBadge';
import PlainTextForm from '../../../forms/PlainTextForm';
import shiftsActions from '../../../../_actions/shifts.actions';

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
    const { title, requirements } = this.state;
    const { shiftData, onHide, dispatch } = this.props;

    // 1. Convert requirements to rolesRequired
    const rolesRequired = requirements.map(r => ({
      roleName: r.role.name,
      number: requirements.numberRequired
    }));

    // 2. Construct payload
    const data = {
      title,
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
      location: shiftData.address,
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
    console.log(this.state);
  };

  handleDataChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
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
                    {date}
                  </Col>
                </Row>
                <Row>
                  <Col className="no-form">
                    <h6>Time</h6>
                    {moment(start, 'H:m:ss')
                      .local()
                      .format('h:mm a')}
                    -
                    {moment(stop, 'H:m:ss')
                      .local()
                      .format('h:mm a')}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PlainTextForm
                      label="managed by"
                      disabled
                      content={`${manager.firstName}  ${manager.lastName}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PlainTextForm
                      label="address"
                      content={address}
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
              {requirements.map(r => (
                <Row key={shiftData.id + r.role.name}>
                  <Col key={shiftData.id + r.role.name}>
                    <AdjustableRoleBadge
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

function mapStateToProps(state) {
  const { shift } = state;
  return {
    shift
  };
}

export default connect(mapStateToProps)(AdminShiftCardModal);
