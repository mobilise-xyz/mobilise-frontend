import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row
} from 'react-bootstrap';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <Card>
      <Accordion>
        <Card.Header>
          <Accordion.Toggle as="h5" eventKey="0">
            <Container>
              <Row>
                <Col
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexBasis: '100%',
                    flex: 'auto'
                  }}
                >
                  <Button aria-controls="privacy-policy-button">
                    Read Privacy Policy
                  </Button>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Text className="text-center">
                        Please read and agree to the terms of the privacy policy
                        before signing up.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item variant="info">
                <Card.Text>
                  We take your privacy seriously. To better protect your privacy
                  we provide this privacy policy notice explaining the way your
                  personal information is collected and used.
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                <Card.Subtitle>Collection of routine information</Card.Subtitle>
                <Card.Text>
                  For the purpose of operating the platform, we collect the
                  routine information in the sign up form above (name, email and
                  contact number). We do not share this information with any
                  external third party organisations, however, in signing up it
                  will be shared with the City Harvest Volunteer coordinator, as
                  it is required for them to approve you as a new Volunteer. We
                  also use this data to allow the Volunteer coordinator to
                  contact you in case of any emergencies or potential shifts and
                  you will be able to select your contact preferences after
                  being accepted by the coordinator. Please note: The Charity
                  may also ask additional questions as part of the sign up
                  process which the coordinator will also be able to see your
                  answers to. However, these questions are covered under the
                  Charities Privacy Policy and Mobilise are merely a data
                  Processor (see Data processing Agreement for details.)
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                <Card.Subtitle>Links to third party websites</Card.Subtitle>
                <Card.Text>
                  We have included links on this website for your use and
                  reference. We are not responsible for the privacy policies on
                  these websites. You should be aware that the privacy policies
                  of these websites may differ from our own.
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                <Card.Subtitle>Security</Card.Subtitle>
                <Card.Text>
                  The security of your personal information is important to us,
                  but remember that no method of transmission over the Internet,
                  or method of electronic storage, is 100% secure. While we
                  strive to use commercially acceptable means to protect your
                  personal information, we cannot guarantee its absolute
                  security.
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                <Card.Subtitle>Changes to this privacy policy</Card.Subtitle>
                <Card.Text className="mb-2">
                  This Privacy Policy is effective as of June 30th 2019 and will
                  remain in effect except with respect to any changes in its
                  provisions in the future, which will be in effect immediately
                  after being posted on this page. We reserve the right to
                  update or change our Privacy Policy at any time and you should
                  check this Privacy Policy periodically. If we make any
                  material changes to this Privacy Policy, we will notify you
                  either through the email address you have provided us, or by
                  placing a prominent notice on our website.
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  );
};

export default PrivacyPolicy;
