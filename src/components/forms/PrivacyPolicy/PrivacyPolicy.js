import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row
} from 'react-bootstrap';
import React from 'react';

const PrivacyPolicy = ({ defaultActiveKey = '', onSignupPage = true }) => {
  const AcceptCheckBox = () => {
    return onSignupPage ? (
      <Form>
        <Form.Group>
          <Form.Label>
            I have read and understand the information outlined in this privacy
            policy.
          </Form.Label>
          <Form.Check name="pp-checkbox" type="checkbox" onChange={() => {}} />
          <Form.Text className="text-muted">
            Please tick this box before signing up.
          </Form.Text>
        </Form.Group>
      </Form>
    ) : null;
  };

  const SignupNotice = () => {
    return onSignupPage ? (
      <Card>
        <Card.Body>
          <Card.Text className="text-center">
            Please read and agree to the terms of the privacy policy before
            signing up.
          </Card.Text>
        </Card.Body>
      </Card>
    ) : null;
  };

  return (
    <Card>
      <Accordion defaultActiveKey={defaultActiveKey}>
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
                  <Button
                    aria-controls="privacy-policy-button"
                    disabled={!onSignupPage}
                  >
                    Privacy Policy
                  </Button>
                </Col>
                <Col>
                  <SignupNotice />
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
                  <p>
                    We take your privacy seriously. To better protect your
                    privacy we provide this privacy policy notice explaining the
                    way your personal information is collected and used. By
                    using the Service, you agree to the collection and use of
                    information in accordance with this policy.
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>Collection of routine information</Card.Subtitle>
                <Card.Text>
                  <p>
                    We collect the routine information in the sign up form above
                    which includes but is not limited to (name, email and
                    contact number).
                  </p>
                  <p>
                    We use this information to operate, maintain, and provide to
                    you the features and functionality of the Service. We do not
                    sell, trade or otherwise transfer this information with any
                    external third party organisations, however, in signing up
                    it will be shared with the City Harvest Volunteer
                    coordinator, as it is required for them to approve you as a
                    new Volunteer. We also use this data to allow the Volunteer
                    coordinator to contact you in case of any emergencies or
                    potential shifts and you will be able to select your contact
                    preferences after being accepted by the coordinator.
                  </p>
                  <p>
                    Please note: The Charity may also ask additional questions
                    as part of the sign up process which the coordinator will
                    also be able to see your answers to. However, these
                    questions are covered under the Charity Privacy Policy and
                    Mobilise are a data processor in this process.
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>
                  Legal Basis for Processing Personal Data under General Data
                  Protection Regulation (GDPR)
                </Card.Subtitle>
                <Card.Text>
                  <p>
                    If you are from the European Economic Area (EEA), our legal
                    basis for collecting and using the personal information
                    described in this Privacy Policy depends on the Personal
                    Data we collect and the specific context in which we collect
                    it. We may process your data because a) you have given us
                    permission to do so. b) The processing is in our legitimate
                    interests and it’s not overridden by your rights. c) To
                    comply with the law.
                  </p>
                  <p>
                    Mobilise will retain your Personal Data only for as long as
                    is necessary for the purposes set out in this Privacy
                    Policy. We will retain and use your Personal Data to the
                    extent necessary to comply with our legal obligations (for
                    example, if we are required to retain your data to comply
                    with applicable laws), resolve disputes, and enforce our
                    legal agreements and policies. Volunteer data collected
                    through online forms will be held for at least two months
                    from the last date of interaction with Mobilise.
                  </p>
                  <p>
                    Your information, including Personal Data, may be
                    transferred to and maintained on computers located outside
                    of your state, province, country or other governmental
                    jurisdiction where the data protection laws may differ than
                    those from your jurisdiction.
                  </p>
                  <p>
                    Your consent to this Privacy Policy followed by your
                    submission of such information represents your agreement to
                    that transfer.
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>Data Protection</Card.Subtitle>
                <Card.Text>
                  <p>
                    Under certain circumstances, we may be required to disclose
                    your Personal Data to enforce our site policies, protect
                    your rights or the rights of others’ property or safety if
                    required to do so by law or in response to valid requests by
                    public authorities (e.g. a court or a government agency).
                  </p>
                  <p>
                    If you are a resident of the European Economic Area (EEA),
                    you have certain data protection rights. Mobilise aims to
                    take reasonable steps to allow you to correct, amend,
                    delete, or limit the use of your Personal Data.
                  </p>
                  <p>
                    If you wish to be informed what Personal Data we hold about
                    you and if you want it to be removed from our systems,
                    please contact us at contact@mobilise.xyz
                  </p>
                  <p>
                    In certain circumstances, you have the following data
                    protection rights:
                    {/*  TODO: Unordered List here */}
                    The right to access, update or to delete the information we
                    have on you. Whenever made possible, you can access, update
                    or request deletion of your Personal Data directly within
                    your account settings section. If you are unable to perform
                    these actions yourself, please contact us to assist you. The
                    right of rectification. You have the right to have your
                    information rectified if that information is inaccurate or
                    incomplete. We will do this within 30 days of your request.
                    The right to object. You have the right to object to our
                    processing of your Personal Data. The right of restriction.
                    You have the right to request that we restrict the
                    processing of your personal information. The right to data
                    portability. You have the right to be provided with a copy
                    of the information we have on you in a structured,
                    machine-readable and commonly used format. The right to
                    withdraw consent. You also have the right to withdraw your
                    consent at any time where Mobilise relied on your consent to
                    process your personal information. Please note that we may
                    ask you to verify your identity before responding to such
                    requests. You have the right to complain to a Data
                    Protection Authority about our collection and use of your
                    Personal Data. For more information, please contact your
                    local data protection authority in the European Economic
                    Area (EEA).
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>Bearer Tokens and Authentication</Card.Subtitle>
                <Card.Text>
                  <p>
                    A bearer token or bearer authentication is a form of
                    security authentication. When you log in to the App with a
                    valid email and password, our servers will generate a
                    cryptic string, called a bearer token, which will be sent
                    back to your device. As you use the App, your device will
                    submit the bearer token back to our servers, which the
                    servers understand essentially as, &apos;give access to the
                    bearer of this token if the token is still valid.&apos;
                  </p>
                  <p>
                    We use bearer tokens for the purposes of authentication (you
                    are who you say you are) and authorization (that you are
                    authorized to access this content) only. We do not use these
                    mechanisms to profile you or target you in any way.
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>Links to third party websites</Card.Subtitle>
                <Card.Text>
                  <p>
                    We have included links on this website for your use and
                    reference. We are not responsible for the privacy policies
                    on these websites. You should be aware that the privacy
                    policies of these websites may differ from our own.
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>Security</Card.Subtitle>
                <Card.Text>
                  <p>
                    The security of your personal information is important to
                    us, but remember that no method of transmission over the
                    Internet, or method of electronic storage, is 100% secure.
                    While we strive to use commercially acceptable means to
                    protect your personal information, we cannot guarantee its
                    absolute security.
                  </p>
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Subtitle>Changes to this privacy policy</Card.Subtitle>
                <Card.Text className="mb-2">
                  <p>
                    This Privacy Policy is effective as of August 17th 2019 and
                    will remain in effect except with respect to any changes in
                    its provisions in the future, which will be in effect
                    immediately after being posted on this page. We reserve the
                    right to update or change our Privacy Policy at any time and
                    you should check this Privacy Policy periodically. If we
                    make any material changes to this Privacy Policy, we will
                    notify you either through the email address you have
                    provided us, or by placing a prominent notice on our
                    website.
                  </p>
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
            <AcceptCheckBox />
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  );
};

export default PrivacyPolicy;
