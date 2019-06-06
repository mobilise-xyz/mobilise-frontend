import React from 'react';
import { Card, Col, Collapse, Row, Image, Container } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import './ShiftCard.css';
import ErrorBoundary from '../ErrorBoundary';
import shiftsActions from '../../_actions/shifts.actions';
import ShiftCardModal from './ShiftCardModal/ShiftCardModal';
import RoleBadge from './ShiftCardModal/RoleBadge';

// shiftData consists of title, description, date, start, stop, address

class ShiftCard extends React.Component {
  state = {
    showModal: false,
    selected: '',
    booked: false
  };

  toggleModal = (submitted = true) => {
    const { booked } = this.state;
    this.setState(state => ({ showModal: !state.showModal }));
    if (!submitted && !booked) {
      this.setState({ selected: '' });
    }
  };

  handleDelete = () => {
    // Hide the modal
    this.toggleModal();

    // Perform deletion
    const { shiftData } = this.props;
    const { dispatch } = this.props;
    const shiftId = shiftData.id;
    dispatch(shiftsActions.deleteWithId(shiftId));
  };

  handleSelect = e => {
    const { name } = e.target;

    const { selected, booked } = this.state;

    if (booked) {
      return;
    }

    // TODO book and unbook requests.
    if (name === selected) {
      // Already selected, select.
      this.setState({
        selected: ''
      });
      // Book
    } else {
      // Not already selected, select.
      this.setState({
        selected: name
      });
      // Unbook
    }
  };

  handleBook = (repeatedType, until) => {
    this.toggleModal();

    const { shiftData, dispatch } = this.props;
    const { selected } = this.state;

    if (selected === null) {
      console.log('THIS SHOULD BE AN ERROR'); // TODO
    }
    dispatch(shiftsActions.book(shiftData.id, selected, repeatedType, until));
  };

  render() {
    const { shiftData, clickable, isAdmin } = this.props;
    const { showModal, selected } = this.state;
    console.log('HELLO');
    const expanded =
      shiftData.deleteSuccess === true || shiftData.bookSuccess === true;

    return (
      <ErrorBoundary>
        <Collapse in={!expanded}>
          <Card
            title={shiftData.title}
            bg={expanded ? 'danger' : 'white'}
            style={{
              width: '100%',
              margin: 'auto',
              zIndex: 0,
              borderRadius: '1rem',
              shadowOffset: { width: 10, height: 10 },
              shadowColor: 'black',
              shadowOpacity: 1.0
            }}
          >
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Container>
                    <Image
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=51.505009,-0.257317&zoom=13&size=200x200&maptype=roadmap
&markers=color:red%7C51.505009,-0.257317&&key=${
                        process.env.REACT_APP_GOOGLE_API_KEY
                      }`}
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '5px',
                        objectFit: 'none' /* Do not scale the image */,
                        objectPosition:
                          'center' /* Center the image within the element */,
                        borderRadius: '50%'
                      }}
                    />
                  </Container>
                  <p style={{ textAlign: 'center' }}>{shiftData.address}</p>
                </Col>
                <Col>
                  <Row>
                    <h4>{shiftData.title}</h4>
                  </Row>
                  <Row />
                  <Row>
                    <Col style={{ paddingLeft: '0px' }}>
                      <h5>Start time</h5>
                      <p>
                        {moment(shiftData.start, 'H:m:ss')
                          .local()
                          .format('h:mm a')}
                      </p>
                    </Col>
                    <Col>
                      <h5>End time</h5>
                      <p>
                        {moment(shiftData.stop, 'H:m:ss')
                          .local()
                          .format('h:mm a')}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <h5>Roles</h5>
                  </Row>
                  <Row>
                    {shiftData.requirements.map(r => {
                      // Only show roles that are available to book
                      // i.e. numberRequired > 0
                      return r.numberRequired > 0 ? (
                        <RoleBadge
                          key={shiftData.id + r.role.name}
                          isAdmin={isAdmin}
                          name={r.role.name}
                          selected={selected}
                          colour={r.role.colour}
                        />
                      ) : null;
                    })}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
            <button
              type="button"
              onClick={this.toggleModal}
              className="stretched-link shift-card-btn"
              disabled={shiftData.bookSuccess === true || clickable === false}
            >
              <span className="sr-only">Card information button</span>
            </button>
            <ShiftCardModal
              isAdmin={isAdmin}
              shiftData={shiftData}
              show={showModal}
              onHide={this.toggleModal}
              handleSelect={this.handleSelect}
              selected={selected}
              handleDelete={this.handleDelete}
              handleBook={this.handleBook}
            />
          </Card>
        </Collapse>
      </ErrorBoundary>
    );
  }
}

function mapStateToProps(state) {
  const { shift } = state;
  return {
    shift
  };
}

export default connect(mapStateToProps)(ShiftCard);
/*
<Row />
<Row>
<Col>
<h6>Location</h6>
<p>{shiftData.address}</p>
</Col>
<Col>
  <h6>Description</h6>
  <p>{shiftData.description}</p>
</Col>
<Col>
<h6>Available roles</h6>
<Row>
  {shiftData.requirements.map(r => {
    // Only show roles that are available to book
    // i.e. numberRequired > 0
    return r.numberRequired > 0 ? (
      <RoleBadge
        key={shiftData.id + r.role.name}
        isAdmin={isAdmin}
        name={r.role.name}
        selected={selected}
        colour={r.role.colour}
      />
    ) : null;
  })}
</Row>
</Col>
</Row>
<Row>
<Col>
<h6>Date</h6>
<p>
{moment(shiftData.date)
.local()
.format('dddd, MMMM Do YYYY')}
</p>
{shiftData.repeatedId ? (
<p className="text-muted">Repeating</p>
) : null}
</Col>
<Col>
<Row noGutters>
<Col>
<h6>Start time</h6>
<p>
{moment(shiftData.start, 'H:m:ss')
.local()
.format('h:mm a')}
</p>
</Col>
<Col>
<h6>End time</h6>
<p>
{moment(shiftData.stop, 'H:m:ss')
.local()
.format('h:mm a')}
</p>
</Col>
</Row>
</Col>
<Col>
<h6>Managed by</h6>
<p>{`${shiftData.creator.user.firstName} ${
shiftData.creator.user.lastName
}`}</p>
</Col>
</Row> */
