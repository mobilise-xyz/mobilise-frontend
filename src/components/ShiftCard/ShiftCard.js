import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import './ShiftCard.css';

class ShiftCards extends React.Component {
  state = {
    show: false
  };

  toggleModal = () => this.setState(state => ({ show: !state.show }));

  render() {
    const { title, children } = this.props;
    const { show } = this.state;

    return (
      <Card title={title} style={{ width: '100%', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {children}
        </Card.Body>
        <button
          type="button"
          onClick={this.toggleModal}
          className="stretched-link shift-card-btn"
        >
          <span className="sr-only">Card infomation button</span>
        </button>

        <ShiftModal
          title={title}
          body={children}
          show={show}
          onHide={this.toggleModal}
        />
      </Card>
    );
  }
}

const ShiftModal = ({ title, body, onHide, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{body}</Modal.Body>
  </Modal>
);

export default ShiftCards;
