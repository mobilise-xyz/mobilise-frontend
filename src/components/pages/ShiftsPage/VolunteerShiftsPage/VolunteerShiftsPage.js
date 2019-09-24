import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import './VolunteerShiftsPage.css';
import shiftsActions from '../../../../_actions/shifts.actions';

const ITEMS_PER_PAGE = 5;

class VolunteerShiftsPage extends React.Component {
  componentDidMount() {
    this.fetchInitialShifts();
  }

  fetchInitialShifts = () => {
    const { dispatch } = this.props;
    const now = moment().format();
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getAvailableForUser(uid, now, null, 1, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, shifts, startTime } = this.props;
    const { length } = shifts;
    const page = Math.round(length / ITEMS_PER_PAGE);
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getAvailableForUser(uid, startTime, null, page + 1));
  };

  render() {
    const { shifts, error, hasMore } = this.props;

    if (!shifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <Layout heading="Book a shift">
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
          <ShiftList shifts={shifts} recommendedCardClass="bg-primary" />
        </InfiniteScroll>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts, error, hasMore, loading, startTime } = state.shifts;
  return {
    shifts,
    error,
    startTime,
    hasMore,
    loading
  };
};

export default connect(mapStateToProps)(VolunteerShiftsPage);
