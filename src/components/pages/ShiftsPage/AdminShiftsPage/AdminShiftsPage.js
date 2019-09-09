import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import shiftsActions from '../../../../_actions/shifts.actions';
import './AdminShiftsPage.css';

const ITEMS_PER_PAGE = 5;

class AdminShiftsPage extends React.Component {
  // TODO Handle exception properly.
  componentDidMount() {
    this.fetchInitialShifts();
  }

  fetchInitialShifts = () => {
    const { dispatch } = this.props;
    const now = moment().format();
    dispatch(shiftsActions.getAll(now, null, 1, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, startTime, shifts } = this.props;
    const { length } = shifts;
    const page = length / ITEMS_PER_PAGE;
    dispatch(shiftsActions.getAll(startTime, null, page + 1));
  };

  render() {
    const { shifts, hasMore, error } = this.props;
    if (!shifts) {
      return null;
    }
    if (error) {
      return <p>error</p>;
    }

    return (
      <Layout heading="Upcoming Shifts">
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
        <InfiniteScroll
          dataLength={shifts.length}
          next={this.fetchMoreShifts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more shifts coming up!</b>
            </p>
          }
        >
          <ShiftList isAdmin shifts={shifts} />
        </InfiniteScroll>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts, startTime, loading, hasMore, error } = state.shifts;
  return {
    shifts,
    startTime,
    loading,
    hasMore,
    error
  };
};

export default connect(mapStateToProps)(AdminShiftsPage);
