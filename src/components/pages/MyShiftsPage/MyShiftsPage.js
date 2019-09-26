import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MyShiftsPage.css';
import Layout from '../../Layout';
import ShiftList from '../../ShiftList';
import shiftsActions from '../../../_actions/shifts.actions';
import { shiftStatus } from '../../Shift';

const ITEMS_PER_PAGE = 5;

class MyShiftsPage extends React.Component {
  componentDidMount = () => {
    this.fetchInitialShifts();
  };

  fetchInitialShifts = () => {
    const { dispatch } = this.props;
    const now = moment().format();
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getBookedForUser(uid, now, null, 1, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, startTime, myShifts } = this.props;
    const { length } = myShifts;
    const page = Math.round(length / ITEMS_PER_PAGE);
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getBookedForUser(uid, startTime, null, page + 1));
  };

  render() {
    const { myShifts, error, hasMore } = this.props;

    if (!myShifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <Layout heading="My Upcoming Shifts" cornerComponent={null}>
        {myShifts.length === 0 ? (
          <h5>You have no upcoming shifts. Why not book one?</h5>
        ) : null}
        <InfiniteScroll
          dataLength={myShifts.length}
          next={this.fetchMoreShifts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more shifts coming up!</b>
            </p>
          }
        >
          <ShiftList type={shiftStatus.BOOKED} shifts={myShifts} />
        </InfiniteScroll>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { myShifts, hasMore, startTime, error } = state.shifts;
  return {
    myShifts,
    error,
    hasMore,
    startTime
  };
};

export default connect(mapStateToProps)(MyShiftsPage);
