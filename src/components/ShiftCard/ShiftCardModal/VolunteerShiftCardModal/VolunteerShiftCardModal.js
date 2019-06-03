import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import RoleBadge from '../RoleBadge';
import '../../ShiftCard.css';
import shiftsActions from '../../../../_actions/shifts.actions';

class VolunteerShiftCardModal extends React.Component {
  state = {
    repeatedType: '',
    until: ''
  };

  getRepeatOptions = repeatedType => {
    // If daily => daily, weekly, month
    // If weekly => weekly, monthly
    // If monthly => monthly
    const options = ['Daily', 'Weekly', 'Monthly'];
    let selectedOptions = [];
    switch (repeatedType) {
      case 'Daily':
        selectedOptions = options.slice();
        break;
      case 'Weekly':
        selectedOptions = options.slice(1);
        break;
      case 'Monthly':
        selectedOptions = options.slice(2);
        break;
      default:
        console.log('Unknown repeated type:', repeatedType);
        selectedOptions = [];
    }
    selectedOptions.unshift('None');
    return selectedOptions;
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleBook = () => {
    const { repeatedType, until } = this.state;
    const { shiftData, selected, dispatch } = this.props;

    if (selected === null) {
      console.log('THIS SHOULD BE AN ERROR'); // TODO
    }
    dispatch(shiftsActions.book(shiftData.id, selected, repeatedType, until));
  };

  render() {
    const { shiftData, onHide, show, handleSelect, selected } = this.props;
    const { repeatedType, until } = this.state;
    const shiftRepeats = shiftData.repeatedId !== null;
    return (
      <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
        <Modal.Header>
          <Modal.Title>{shiftData.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <h6>Choose a role to book</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              {shiftData.requirements.map(r => {
                // Only show roles that are available to book
                // i.e. numberRequired > 0
                return r.numberRequired > 0 ? (
                  <RoleBadge
                    key={shiftData.id + r.role.name}
                    name={r.role.name}
                    colour={r.role.colour}
                    selected={selected}
                    handleSelect={handleSelect}
                  />
                ) : null;
              })}
            </Col>
          </Row>
          {shiftData.repeated ? (
            <p>
              This shift repeats until&nbsp;
              <strong>
                {moment(shiftData.repeated.untilDate, 'YYYY-MM-DD')
                  .local()
                  .format('dddd, MMMM Do YYYY')}
              </strong>
              .
            </p>
          ) : null}
          <Row>
            <Col>
              <h6>Book repeating?</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form id="bookingform">
                <Form.Group>
                  <Form.Label>Repeat frequency</Form.Label>
                  {/* Only enable this form if repeatedId is not null. */}
                  <Form.Control
                    as="select"
                    name="repeatedType"
                    disabled={!shiftRepeats}
                    value={repeatedType}
                    onChange={this.handleChange}
                  >
                    {shiftData.repeated
                      ? this.getRepeatOptions(shiftData.repeated.type).map(
                          option => <option>{option}</option>
                        )
                      : null}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  {/* The user should not be able to select before today's date, and not after the end start of the repeating shift. */}
                  <Form.Control
                    type="date"
                    name="until"
                    min={moment().format('YYYY-MM-DD')}
                    disabled={!shiftRepeats}
                    value={until}
                    onChange={this.handleChange}
                    max={
                      shiftData.repeated ? shiftData.repeated.untilDate : null
                    }
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem'
          }}
        >
          <Button
            variant="outline-secondary"
            onClick={() => onHide(false)}
            form="bookingform"
          >
            Close
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            disabled={shiftData.bookSuccess === true}
            onClick={this.handleBook}
          >
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { shift } = state;
  return {
    shift
  };
}

export default connect(mapStateToProps)(VolunteerShiftCardModal);
