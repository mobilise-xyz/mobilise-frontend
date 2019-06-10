import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import PlainTextForm from '../../../forms/PlainTextForm';
import ModalRoleBadge from '../../RoleBadges/ModalRoleBadge';
import authHeader from '../../../../_helpers/auth-header';
import utils from '../../../../_helpers/utils';

const CancelRightPane = ({
  shiftData,
  cancelReason,
  onHide,
  // repeatedType,
  // until,
  handleChange
}) => {
  // TODO: repeated cancellation (at some point)

  const handleCancel = () => {
    const { id } = shiftData;
    onHide();

    const headers = authHeader();

    const data = { reason: cancelReason };

    axios
      .delete(`/shifts/${id}/booking`, { headers, data })
      .then(utils.handleResponse);
  };

  return (
    <>
      <Row>
        <Col>
          <h6>Signed up to:</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <h6>You're signed up for:</h6> */}
          {shiftData.requirements.map(r => (
            <ModalRoleBadge
              key={shiftData.id + r.role.name}
              name={r.role.name}
              onModal
              colour={r.role.colour}
            />
          ))}
        </Col>
      </Row>
      <Row style={{ position: 'inherit', bottom: '-20%' }}>
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
                rows="5"
                handleChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-danger"
                type="submit"
                onClick={handleCancel}
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
};

export default CancelRightPane;
