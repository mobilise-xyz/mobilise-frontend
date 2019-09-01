import React from 'react';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import volunteerActions from '../../../../_actions/volunteer.actions';
import NewEmergencyContactModal from './NewEmergencyContactModal';

class MyEmergencyContacts extends React.Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    const { contacts, dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    if (!contacts) {
      dispatch(volunteerActions.getContacts(uid));
    }
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  addContact = (firstName, lastName, email, telephone, relation) => {
    this.toggleModal();
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(
      volunteerActions.addContact(
        uid,
        firstName,
        lastName,
        email,
        telephone,
        relation
      )
    );
  };

  removeContact = id => {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(volunteerActions.removeContact(uid, id));
  };

  render() {
    let { contacts } = this.props;
    const { showModal } = this.state;

    if (!contacts) {
      contacts = [];
    }

    return (
      <Container className="pt-5 relaxed">
        <h3>My Emergency Contacts</h3>
        {contacts.length > 0 ? (
          contacts.map(contact => {
            return (
              <Row key={contact.id} style={{ margin: '20px' }}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Title>
                            {contact.firstName} {contact.lastName}
                          </Card.Title>
                          <div style={{ height: '7%' }} />
                          <Card.Text>Telephone: {contact.telephone}</Card.Text>
                          {contact.email ? (
                            <Card.Text className="mb-2 text-muted">
                              Email:{' '}
                              <a href={`mailto:${contact.email}`}>
                                {contact.email}
                              </a>
                            </Card.Text>
                          ) : null}
                        </Col>
                        <Col
                          md={1}
                          style={{ marginTop: 'auto', marginBottom: 'auto' }}
                        >
                          <Button
                            onClick={() => this.removeContact(contact.id)}
                          >
                            <FontAwesomeIcon
                              className="text-danger"
                              icon={faTrash}
                              size="2x"
                            />
                          </Button>
                        </Col>
                        <Col
                          md={1}
                          style={{ marginTop: 'auto', marginBottom: 'auto' }}
                        ></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })
        ) : (
          <h5>Please add an emergency contact</h5>
        )}
        <Row>
          <Button
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            onClick={this.toggleModal}
          >
            <FontAwesomeIcon
              className="text-secondary"
              icon={faPlus}
              size="2x"
            />
          </Button>
        </Row>
        <NewEmergencyContactModal
          show={showModal}
          onHide={this.toggleModal}
          handleSubmit={this.addContact}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { contacts } = state.volunteers;
  return { contacts };
};

export default connect(mapStateToProps)(MyEmergencyContacts);
