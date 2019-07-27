import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import './VolunteerShiftsPage.css';
import shiftsActions from '../../../../_actions/shifts.actions';

class VolunteerShiftsPage extends React.Component {
  componentDidMount() {
    this.fetchInitialShifts();
  }

  fetchInitialShifts = () => {
    const { dispatch } = this.props;
    const now = moment().format();
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getAvailableForUser(uid, now, 1, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, page, startTime } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getAvailableForUser(uid, startTime, page));
  };

  refresh = () => {
    this.fetchInitialShifts();
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
          dataLength={shifts.all.length}
          next={this.fetchMoreShifts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more shifts coming up!</b>
            </p>
          }
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshContent={
            <Spinner
              animation="border"
              role="status"
              style={{ marginLeft: '50%', marginBottom: '30px' }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          releaseToRefreshContent={
            <Spinner
              animation="border"
              role="status"
              style={{ marginLeft: '50%', marginBottom: '30px' }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
        >
          <ShiftList shifts={shifts.all} recommendedCardClass="bg-primary" />
        </InfiniteScroll>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts, error, page, hasMore, startTime } = state.shifts;
  return {
    shifts,
    error,
    startTime,
    hasMore,
    page
  };
};

export default connect(mapStateToProps)(VolunteerShiftsPage);
