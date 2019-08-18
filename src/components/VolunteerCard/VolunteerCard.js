import React from 'react';
import moment from 'moment';
import { Card, Nav, Tab } from 'react-bootstrap';

const VolunteerCard = ({ volunteer }) => {
  return (
    <Card>
      <Tab.Container defaultActiveKey="first">
        <Card.Header style={{ paddingTop: '0', paddingBottom: '0' }}>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="first">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Card.Title>
                {volunteer.user.firstName} {volunteer.user.lastName}
              </Card.Title>
              <Card.Text>
                Joined <strong>{moment(volunteer.createdAt).fromNow()}</strong>
              </Card.Text>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              Email:{' '}
              <a href={`mailto:${volunteer.user.email}`}>
                {volunteer.user.email}
              </a>
              <Card.Text>Telephone: {volunteer.user.telephone}</Card.Text>
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
};

export default VolunteerCard;
