import React from 'react';
import { Modal, Tab, Nav } from 'react-bootstrap';
import moment from 'moment';
import './VolunteerCardModal.css';

function VolunteerCardModal(props) {
  const { show, onHide, volunteer } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {volunteer.user.firstName} {volunteer.user.lastName}
        </Modal.Title>
      </Modal.Header>
      <div style={{ height: '1px', backgroundColor: 'lightGray' }} />
      <Tab.Container defaultActiveKey="about">
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey="about">
              Joined <strong>{moment(volunteer.createdAt).fromNow()}</strong>
              <br />
              <br />
              Email:{' '}
              <a href={`mailto:${volunteer.user.email}`}>
                {volunteer.user.email}
              </a>
              <br />
              Telephone: {volunteer.user.telephone}
            </Tab.Pane>
            <Tab.Pane eventKey="availability">Nothing to see here.</Tab.Pane>
            <Tab.Pane eventKey="statistics">Nothing to see here.</Tab.Pane>
          </Tab.Content>
        </Modal.Body>
        <div style={{ height: '1px', backgroundColor: 'lightGray' }} />
        <Modal.Footer className="modal-footer">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="availability">Availability</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="statistics">statistics</Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Footer>
      </Tab.Container>
    </Modal>
  );
}

export default VolunteerCardModal;
