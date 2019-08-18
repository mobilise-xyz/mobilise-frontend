import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Container,
  Card,
  Nav,
  Tab,
  Col,
  Row,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import volunteerActions from '../../../_actions/volunteer.actions';
import Layout from '../../Layout/Layout';

class VolunteersPage extends React.Component {
  state = {
    search: ''
  };

  componentDidMount() {
    const { volunteers, dispatch } = this.props;
    if (!volunteers) {
      dispatch(volunteerActions.getAll(true, 'desc(createdAt)'));
    }
  }

  handleDataChange = e => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
    let { volunteers } = this.props;

    if (!volunteers) {
      volunteers = [];
    }

    return (
      <Layout
        heading="Volunteers"
        cornerComponent={
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              type="text"
              onChange={this.handleDataChange}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        }
      >
        <hr />
        <Container className="pt-5 relaxed">
          {volunteers
            .filter(volunteer => {
              const { firstName, lastName } = volunteer.user;
              return (
                firstName.startsWith(search) ||
                lastName.startsWith(search) ||
                `${firstName} ${lastName}`.startsWith(search)
              );
            })
            .sort((a, b) => {
              if (a.user.firstName === b.user.firstName) {
                return a.user.lastName > b.user.lastName ? 1 : -1;
              }
              return a.user.firstName > b.user.firstName ? 1 : -1;
            })
            .map(volunteer => {
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
                                Joined{' '}
                                <strong>
                                  {moment(volunteer.createdAt).fromNow()}
                                </strong>
                              </Card.Text>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <Card.Text>
                                Email: {volunteer.user.email}
                              </Card.Text>
                              <Card.Text>
                                Telephone: {volunteer.user.telephone}
                              </Card.Text>
                            </Tab.Pane>
                          </Tab.Content>
                        </Card.Body>
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
  const { approved } = state.volunteers;
  return { volunteers: approved };
};

export default connect(mapStateToProps)(VolunteersPage);
