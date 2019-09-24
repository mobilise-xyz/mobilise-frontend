import React from 'react';
import { connect } from 'react-redux';
import {
  CardColumns,
  Col,
  Container,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import VolunteerCard from '../../VolunteerCard';
import volunteerActions from '../../../_actions/volunteer.actions';
import usersActions from '../../../_actions/users.actions';
import Layout from '../../Layout/Layout';
import InviteVolunteerModal from './InviteVolunteerModal';

function nameIsValidForSearch(firstName, lastName, search) {
  const first = firstName.toLowerCase();
  const last = lastName.toLowerCase();
  return (
    first.startsWith(search) ||
    last.startsWith(search) ||
    `${first} ${last}`.startsWith(search)
  );
}

function compareUsers(user1, user2) {
  if (user1.firstName === user2.firstName) {
    return user1.lastName > user2.lastName ? 1 : -1;
  }
  return user1.firstName > user2.firstName ? 1 : -1;
}

class VolunteersPage extends React.Component {
  state = {
    search: '',
    showModal: false
  };

  componentDidMount() {
    const { volunteers, dispatch } = this.props;
    if (!volunteers) {
      dispatch(volunteerActions.getAll());
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
    const searchFilter = search.toLowerCase();
    if (!volunteers) {
      volunteers = [];
    }
    const volunteerMap = this.partitionVolunteersByLetter(
      volunteers
        .filter(volunteer => {
          const { lastName, firstName } = volunteer.user;
          return nameIsValidForSearch(firstName, lastName, searchFilter);
        })
        .sort((volunteer1, volunteer2) => {
          return compareUsers(volunteer1.user, volunteer2.user);
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
              <div key={volunteerGroup.letter}>
                <h2>{volunteerGroup.letter}</h2>
                <hr />
                <CardColumns style={{ paddingBottom: '1em' }}>
                  {volunteerGroup.volunteers.map(volunteer => {
                    return (
                      <VolunteerCard
                        key={volunteer.userId}
                        volunteer={volunteer}
                      />
                    );
                  })}
                </CardColumns>
              </div>
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
