import React from 'react';
import { Card, Modal, Container } from 'react-bootstrap';
import './ShiftCard.css';
import RoleBadge from './RoleBadge';

// shiftData consists of title, description, date, start, stop, postcode(?)

class ShiftCard extends React.Component {
  state = {
    show: false
  };

  toggleModal = () => this.setState(state => ({ show: !state.show }));

  render() {
    const { shiftData } = this.props;
    const { show } = this.state;
    return (
      <Card title={shiftData.title} style={{ width: '100%', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>{shiftData.title}</Card.Title>
          {shiftData.description}
        </Card.Body>
        <button
          type="button"
          onClick={this.toggleModal}
          className="stretched-link shift-card-btn"
        >
          <span className="sr-only">Card infomation button</span>
        </button>

        <ShiftModal
          shiftData={shiftData}
          show={show}
          onHide={this.toggleModal}
        />
      </Card>
    );
  }
}

const ShiftModal = ({ shiftData, onHide, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header>
      <Modal.Title>{shiftData.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>{shiftData.description}</p>
      <Container>
        {shiftData.roles.map(r => {
          console.log('role', r);
          return (
            <RoleBadge
              key={shiftData.id}
              name={r.name}
              number={r.ShiftRole.numberRequired}
            />
          );
        })}
      </Container>
    </Modal.Body>
  </Modal>
);

export default ShiftCard;
