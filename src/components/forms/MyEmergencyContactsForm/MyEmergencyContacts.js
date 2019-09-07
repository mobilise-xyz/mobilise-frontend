import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import NewEmergencyContactModal from './NewEmergencyContactModal';
import volunteerActions from '../../../_actions/volunteer.actions';

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

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
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
      <>
        <p>
          Please add at least 1 emergency contact. This will only be visible to
          the volunteer coordinators at City Harvest London.
        </p>
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
                            {contact.firstName} {contact.lastName} (
                            {contact.relation})
                          </Card.Title>
                          <Card.Text className="mb-2 text-muted">
                            Telephone: {contact.telephone}
                          </Card.Text>
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
                              className="text-silver"
                              icon={faEdit}
                              size="2x"
                            />
                          </Button>
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
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })
        ) : (
          <p>No current contacts.</p>
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
      </>
    );
  }
}

const mapStateToProps = state => {
  const { contacts } = state.volunteers;
  return { contacts };
};

export default connect(mapStateToProps)(MyEmergencyContacts);
