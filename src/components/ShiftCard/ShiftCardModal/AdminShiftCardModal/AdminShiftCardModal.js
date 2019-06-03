import React from 'react';
import { Modal, Button, ButtonToolbar, Form, Col } from 'react-bootstrap';
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
              <Form.Control as={Col} type="number" />
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
        Delete
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
