import React from 'react';
import { Card } from 'react-bootstrap';
import ErrorBoundary from '../ErrorBoundary';
import VolunteerCardModal from './VolunteerCardModal';

class VolunteerCard extends React.Component {
  state = {
    showModal: false
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { volunteer } = this.props;
    const { showModal } = this.state;

    return (
      <ErrorBoundary>
        <div
          onClick={this.toggleModal}
          style={{ cursor: 'pointer' }}
          role="presentation"
        >
          <Card>
            <Card.Header style={{ paddingBottom: '0' }}>
              <Card.Title>
                {volunteer.user.firstName} {volunteer.user.lastName}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              Email:{' '}
              <a href={`mailto:${volunteer.user.email}`}>
                {volunteer.user.email}
              </a>
              <Card.Text>Telephone: {volunteer.user.telephone}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <VolunteerCardModal
          volunteer={volunteer}
          show={showModal}
          onHide={this.toggleModal}
          handleSubmit={this.uploadFile}
        />
      </ErrorBoundary>
    );
  }
}

export default VolunteerCard;
