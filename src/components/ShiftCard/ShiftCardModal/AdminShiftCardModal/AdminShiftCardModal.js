import React from 'react';
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

const AdminShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleSelect,
  selected,
  handleDelete
}) => (
  <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
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
        {shiftData.requirements.map(r => (
          <Form.Row key={`${r.role.name}-roles-form-row`}>
            <Col>
              <Form.Label as={Col}>
                <RoleBadge
                  key={shiftData.id + r.role.name}
                  name={r.role.name}
                  number={r.numberRequired}
                  colour={r.role.colour}
                  selected={selected}
                  handleSelect={handleSelect}
                  clickable={false}
                />
              </Form.Label>
            </Col>
            <Col>
              <Form.Label>
                Edit Required Number for Role: {r.role.name}
              </Form.Label>
              <Form.Control type="number" />
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
      <Button className="mr-2" variant="outline-danger" onClick={handleDelete}>
        Delete {<FontAwesomeIcon icon={faTrash} />}
      </Button>
      <ButtonToolbar role="toolbar">
        <Button className="mr-2" variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="outline-primary" type="submit">
          Save changes
        </Button>
      </ButtonToolbar>
    </Modal.Footer>
  </Modal>
);

export default AdminShiftCardModal;
