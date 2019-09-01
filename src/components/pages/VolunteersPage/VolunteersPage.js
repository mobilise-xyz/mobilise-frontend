import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  FormControl,
  InputGroup,
  Row,
  Col,
  CardColumns,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import VolunteerCard from '../../VolunteerCard';
import volunteerActions from '../../../_actions/volunteer.actions';
import usersActions from '../../../_actions/users.actions';
import Layout from '../../Layout/Layout';
import InviteVolunteerModal from './InviteVolunteerModal';

class VolunteersPage extends React.Component {
  state = {
    search: '',
    showModal: false
  };

  componentDidMount() {
    const { volunteers, dispatch } = this.props;
    if (!volunteers) {
      dispatch(volunteerActions.getAll('desc(createdAt)'));
    }
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  handleInvite = (email, isAdmin) => {
    const { dispatch } = this.props;
    dispatch(usersActions.invite(email, isAdmin));
    this.toggleModal();
  };

  handleDataChange = e => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  partitionVolunteersByLetter = volunteers => {
    const volunteerMap = [];
    let i = 0;
    while (i < volunteers.length) {
      const volunteer = volunteers[i];
      const entry = { letter: volunteer.user.firstName[0] };
      const vols = [volunteer];
      i += 1;
      while (i < volunteers.length) {
        const nextVolunteer = volunteers[i];
        if (nextVolunteer.user.firstName[0] !== entry.letter) {
          break;
        }
        vols.push(nextVolunteer);
        i += 1;
      }
      entry.volunteers = vols;
      volunteerMap.push(entry);
    }
    return volunteerMap;
  };

  render() {
    const { search, showModal } = this.state;
    let { volunteers } = this.props;

    if (!volunteers) {
      volunteers = [];
    }
    const volunteerMap = this.partitionVolunteersByLetter(
      volunteers
        .filter(volunteer => {
          const { firstName, lastName } = volunteer.user;
          return (
            firstName.startsWith(search) ||
            lastName.startsWith(search) ||
            `${firstName} ${lastName}`.startsWith(search)
          );
        })
        .sort((a, b) => {
          if (a.user.firstName === b.user.firstName) {
            return a.user.lastName > b.user.lastName ? 1 : -1;
          }
          return a.user.firstName > b.user.firstName ? 1 : -1;
        })
    );
    return (
      <Layout
        heading="Volunteers"
        cornerComponent={
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              type="text"
              onChange={this.handleDataChange}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        }
      >
        <hr />
        <Row>
          <Col style={{ textAlign: 'right', marginRight: '2em' }}>
            <OverlayTrigger overlay={<Tooltip>Invite new volunteer</Tooltip>}>
              <button
                type="button"
                className="btn btn-primary bmd-btn-fab add-shift-fab"
                onClick={this.toggleModal}
              >
                <i className="material-icons md-light">add</i>
              </button>
            </OverlayTrigger>
          </Col>
        </Row>
        <Container className="pt-5 relaxed" style={{ paddingTop: '0' }}>
          {volunteerMap.map(volunteerGroup => {
            return (
              <>
                <h2>{volunteerGroup.letter}</h2>
                <hr />
                <CardColumns style={{ paddingBottom: '1em' }}>
                  {volunteerGroup.volunteers.map(volunteer => {
                    return <VolunteerCard volunteer={volunteer} />;
                  })}
                </CardColumns>
              </>
            );
          })}
        </Container>
        <InviteVolunteerModal
          show={showModal}
          onHide={this.toggleModal}
          handleSubmit={this.handleInvite}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { approved } = state.volunteers;
  return { volunteers: approved };
};

export default connect(mapStateToProps)(VolunteersPage);
