import React from 'react';
import { Accordion, Card, Container, Modal, Nav, Tab } from 'react-bootstrap';
import moment from 'moment';
import AvailabilityGrid from '../../forms/AvailabilityForm/AvailabilityGrid';
import './VolunteerCardModal.css';

const transposeArray = array =>
  array[0].map((col, i) => array.map(row => row[i]));

const integerToAvailability = {
  '2': 'AVAILABILITY_AVAILABLE',
  '1': 'AVAILABILITY_MAYBE',
  '0': 'AVAILABILITY_UNAVAILABLE'
};

function VolunteerCardModal(props) {
  const { show, onHide, volunteer } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="volunteer-card-modal" closeButton>
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
            <Tab.Pane eventKey="emergency">
              {volunteer.contacts.length > 0 ? (
                <div>
                  <p>
                    The emergency contacts for this volunteer are listed below:
                  </p>
                  {volunteer.contacts.map(contact => {
                    return (
                      <Accordion key={contact.id}>
                        <Card>
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey={contact.id}
                            style={{ cursor: 'pointer' }}
                          >
                            {contact.firstName} {contact.lastName} (
                            {contact.relation})
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey={contact.id}>
                            <Card.Body>
                              <Card.Text>
                                Telephone: {contact.telephone}
                              </Card.Text>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    );
                  })}
                </div>
              ) : (
                <p>No emergency contact added.</p>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="availability">
              <Container className="table-responsive">
                <AvailabilityGrid
                  availability={transposeArray(volunteer.availability).map(i =>
                    i.map(j => integerToAvailability[j])
                  )}
                  handleClick={() => {}}
                />
              </Container>
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
        <div style={{ height: '1px', backgroundColor: 'lightGray' }} />
        <Modal.Footer className="volunteer-card-modal modal-footer">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="emergency">Emergency</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="availability">Availability</Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Footer>
      </Tab.Container>
    </Modal>
  );
}

export default VolunteerCardModal;
