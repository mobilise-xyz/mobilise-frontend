import React, { Component } from 'react';
import {
  Modal,
  Button,
  ButtonToolbar,
  Form,
  Col,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../ShiftCard.css';
import RoleBadge from '../RoleBadge';

class AdminShiftCardModal extends Component {
  constructor(props) {
    super(props);
    const {
      shiftData: { requirements }
    } = this.props;
    this.state = { requirements };
    console.log(requirements);
  }

  handleSubmit = () => {
    // axios PUT roles in the boi
  };

  handleRoleNumberUpdate = e => {
    console.log(e);
  };

  render() {
    const { shiftData, onHide, show, handleDelete } = this.props;
    const { requirements } = this.state;
    return (
      <Modal show={show} onHide={onHide}>
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
          <h6>Roles on this shift</h6>
          <Form>
            {requirements.map(r => (
              <Form.Row key={`${r.role.name}-roles-form-row`}>
                <Col>
                  <Form.Label as={Col}>
                    <RoleBadge
                      key={shiftData.id + r.role.name}
                      isAdmin
                      name={r.role.name}
                      number={r.numberRequired}
                      handleUpdate={this.handleRoleNumberUpdate}
                      onModal
                      colour={r.role.colour}
                    />
                  </Form.Label>
                </Col>
              </Form.Row>
            ))}
          </Form>
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
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button variant="outline-primary" type="submit">
              Save changes
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AdminShiftCardModal;
