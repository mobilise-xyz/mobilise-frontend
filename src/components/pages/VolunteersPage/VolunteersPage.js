import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Container, Card, Nav, Tab, Button, Col, Row } from 'react-bootstrap';
import volunteerActions from '../../../_actions/volunteer.actions';
import Layout from '../../Layout/Layout';

class VolunteersPage extends React.Component {
  componentDidMount() {
    const { volunteers, dispatch } = this.props;

    if (!volunteers) {
      dispatch(volunteerActions.getAll(false, 'asc(createdAt)'));
    }
  }

  approve(uid) {
    const { dispatch } = this.props;

    dispatch(volunteerActions.approve(uid));
  }

  render() {
    let { volunteers } = this.props;

    if (!volunteers) {
      volunteers = [];
    }

    return (
      <Layout heading="Volunteers">
        <hr />
        <Container className="pt-5 relaxed">
          <h3>Approval Requests</h3>
          This is where you can approve or decline new volunteers
          {volunteers.map(volunteer => {
            return (
              <Row key={volunteer.user.email} style={{ margin: '20px' }}>
                <Col>
                  <Card>
                    <Tab.Container defaultActiveKey="first">
                      <Card.Header
                        style={{ paddingTop: '0', paddingBottom: '0' }}
                      >
                        <Nav variant="pills">
                          <Nav.Item>
                            <Nav.Link eventKey="first">About</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Contact</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="third">Answers</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Card.Header>
                      <Card.Body>
                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            <Card.Title>
                              {volunteer.user.firstName}{' '}
                              {volunteer.user.lastName}
                            </Card.Title>
                            <Card.Text>
                              Requested access{' '}
                              <strong>
                                {moment(volunteer.createdAt).fromNow()}
                              </strong>
                            </Card.Text>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <Card.Text>Email: {volunteer.user.email}</Card.Text>
                            <Card.Text>
                              Telephone: {volunteer.user.telephone}
                            </Card.Text>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <Card.Text>Nothing to see here ... yet</Card.Text>
                          </Tab.Pane>
                        </Tab.Content>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          onClick={() => this.approve(volunteer.userId)}
                          variant="primary"
                        >
                          Approve
                        </Button>
                        <Button variant="danger">Decline</Button>
                      </Card.Footer>
                    </Tab.Container>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { volunteers } = state.volunteers;
  return { volunteers };
};

export default connect(mapStateToProps)(VolunteersPage);
