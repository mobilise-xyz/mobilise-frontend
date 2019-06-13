import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import PlainTextForm from '../../../forms/PlainTextForm';
import CardRoleBadge from '../../RoleBadges/CardRoleBadge';
import shiftsActions from '../../../../_actions/shifts.actions';
import shiftTypes from '../../../../__types/shifts.types';
import store from '../../../../_helpers/store';

class CancelPane extends React.Component {
  state = {
    cancelReason: ''
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ cancelReason: value });
  };

  handleCancel = () => {
    const { id, onHide } = this.props;

    // Hide the modal
    onHide();

    const { cancelReason } = this.state;

    store.dispatch(shiftsActions.cancel(id, cancelReason));
  };

  render() {
    // TODO: repeated cancellation (at some point)
    const { cancelReason } = this.state;
    const { id, requirements } = this.props;

    return (
      <>
        <Row>
          <Col>
            <h6>You&#39;re signed up for</h6>
          </Col>
        </Row>
        <Row className="pb-4">
          <Col>
            {requirements.map(r => (
              <CardRoleBadge
                key={id + r.role.name}
                name={r.role.name}
                colour={r.role.colour}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <h6>Need to cancel?</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <PlainTextForm
                  id="description"
                  label="reason"
                  placeHolder="Provide a brief reason for cancellation"
                  content={cancelReason}
                  handleChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-danger"
                  type="submit"
                  onClick={this.handleCancel}
                  style={{ marginLeft: 'auto' }}
                  block
                >
                  Cancel Booking
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

CancelPane.propTypes = {
  id: PropTypes.string.isRequired,
  requirements: PropTypes.arrayOf(shiftTypes.requirement).isRequired,
  onHide: PropTypes.func.isRequired
};

export default CancelPane;
