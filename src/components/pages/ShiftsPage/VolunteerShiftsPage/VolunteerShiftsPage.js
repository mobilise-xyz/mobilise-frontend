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
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const now = moment().format();
    const later = moment()
      .add(14, 'days')
      .format();
    // Do not make the request again if shifts are already in the store.
    dispatch(shiftsActions.getAvailableForUser(uid, now, later, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, before } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    const later = moment(before)
      .add(14, 'days')
      .format();
    dispatch(shiftsActions.getAvailableForUser(uid, before, later));
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
  const { shifts, error, loading, hasMore, before } = state.shifts;
  return {
    shifts,
    error,
    loading,
    hasMore,
    before
  };
};

export default connect(mapStateToProps)(VolunteerShiftsPage);
