import React from 'react';
import { Button } from 'react-floating-action-button';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import shiftsActions from '../../../../_actions/shifts.actions';
import './AdminShiftsPage.css';

class AdminShiftsPage extends React.Component {
  // TODO Handle exception properly.
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(shiftsActions.getAll());
  }

  render() {
    const { shifts, loading, error } = this.props;

    if (loading === true || !shifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <Layout>
        <Container>
          <LinkContainer exact to="new-shift" className="add-shift-fab">
            <Button
              tooltip="Add a new shift"
              styles={{ backgroundColor: 'green' }}
            >
              <FontAwesomeIcon icon={faPlus} color="white" />
            </Button>
          </LinkContainer>
        </Container>
        <ShiftList isAdmin shifts={shifts.all} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts, loading, error } = state.shifts;
  return {
    shifts,
    loading,
    error
  };
};

export default connect(mapStateToProps)(AdminShiftsPage);
