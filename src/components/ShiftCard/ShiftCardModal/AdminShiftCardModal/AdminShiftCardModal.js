import React, { Component } from 'react';
import {
  Modal,
  Button,
  ButtonToolbar,
  Col,
  OverlayTrigger,
  Tooltip,
  Row
} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../ShiftCard.css';
import RoleBadge from '../RoleBadge';
import authHeader from '../../../../_helpers/auth-header';
import utils from '../../../../_helpers/utils';

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
          <Modal.Title>{shiftData.title}</Modal.Title>
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="edit-shift-info-tooltip">
                Edit additional shift information
              </Tooltip>
            }
          >
            <Button variant="info">{<FontAwesomeIcon icon={faEdit} />}</Button>
          </OverlayTrigger>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h6>Description</h6>
                  {shiftData.description}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Date</h6>
                  {shiftData.Date}
                </Col>
              </Row>
              <Row>
                <Col>
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
            </Col>
            <Col>
              <Row>
                <Col>
                  <h6>Roles on this shift</h6>
                </Col>
              </Row>
              {shiftData.requirements.map(r => (
                <Row>
                  <Col>
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

        <Modal.Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem'
          }}
        >
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
