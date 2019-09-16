import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../ShiftCard/ShiftCard.css';
import availabilityActions from '../../../_actions/availability.actions';
import AvailabilitySelector from './AvailabilitySelector';

class AvailabilityForm extends React.Component {
  handleSubmit = () => {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const { availability, dispatch } = this.props;
    dispatch(availabilityActions.update(uid, availability));
  };

  render() {
    return (
      <Card className="p-3">
        <AvailabilitySelector />
        <Container className="pt-5 text-center">
          <Button
            variant="outline-primary"
            type="button"
            onClick={this.handleSubmit}
          >
            Save changes
          </Button>
        </Container>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { availability } = state;
  return {
    availability
  };
};

export default connect(mapStateToProps)(AvailabilityForm);
