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
      shiftData
    };
    this.originalRequirements = shiftData.requirements.slice();
  }

  handleSubmit = e => {
    // Prevent no changes being made.
    e.preventDefault();

    const { shiftData, onHide } = this.props;
    const config = { headers: authHeader() };

    const postData = {
      rolesRequired: shiftData.requirements.map(r => ({
        roleName: r.role.name,
        number: r.numberRequired
      }))
    };

    axios
      .put(`/shifts/${shiftData.id}/rolesRequired`, postData, config)
      .then(resp => {
        utils.handleResponse(resp);
        onHide();
      });
  };

  handleCancel = () => {
    const { onHide } = this.props;
    this.setState({
      shiftData: { requirements: this.originalRequirements }
    });
    onHide();
  };

  handleRoleNumberUpdate = (name, newNumber) => {
    const { shiftData } = this.props;

    const requirementsCopy = [...shiftData.requirements];
    const roleToUpdate = requirementsCopy.find(r => r.role.name === name);

    if (roleToUpdate) {
      roleToUpdate.numberRequired = newNumber;
    }

    this.setState(prevState => ({
      ...prevState,
      shiftData: { requirements: requirementsCopy }
    }));
  };

  render() {
    const { shiftData, onHide, show, handleDelete } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header>
          <Modal.Title>
            <PlainTextForm label="" content={shiftData.title} />
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
                      content={shiftData.description}
                      handleChange={null}
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
                      content={shiftData.address}
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
                      handleUpdate={this.handleRoleNumberUpdate}
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
