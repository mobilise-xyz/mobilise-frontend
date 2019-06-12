import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import shiftsActions from '../../../../_actions/shifts.actions';
import './AdminShiftsPage.css';

class AdminShiftsPage extends React.Component {
  // TODO Handle exception properly.
  componentDidMount() {
    const { dispatch } = this.props;
    const now = moment().format();
    dispatch(shiftsActions.getAll(now));
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
        <Link to="new-shift">
          <OverlayTrigger overlay={<Tooltip>Add new shift</Tooltip>}>
            <button
              type="button"
              className="btn btn-primary bmd-btn-fab add-shift-fab"
            >
              <i className="material-icons md-light">add</i>
            </button>
          </OverlayTrigger>
        </Link>

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
