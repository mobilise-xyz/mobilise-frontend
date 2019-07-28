import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './MyShiftsPage.css';
import Layout from '../../Layout';
import ShiftList from '../../ShiftList';
import shiftsActions from '../../../_actions/shifts.actions';
import CalendarView from '../CalendarView/CalendarView';

const ITEMS_PER_PAGE = 5;

const ViewSwitch = ({ handleListView, handleCalendarView }) => (
  <Col>
    <ToggleButtonGroup type="radio" name="viewOptions" defaultValue={1}>
      <ToggleButton value={1} variant="primary" onClick={handleListView}>
        List
      </ToggleButton>
      <ToggleButton value={2} variant="primary" onClick={handleCalendarView}>
        Calendar
      </ToggleButton>
    </ToggleButtonGroup>
  </Col>
);

class MyShiftsPage extends React.Component {
  state = {
    viewType: 'list'
  };

  handleListView = () => {
    this.setState({ viewType: 'list' });
  };

  handleCalendarView = () => {
    this.setState({ viewType: 'calendar' });
  };

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
    const { length } = myShifts.all;
    const page = length / ITEMS_PER_PAGE;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getBookedForUser(uid, startTime, null, page + 1));
  };

  refresh = () => {
    this.fetchInitialShifts();
  };

  handleCalendarRangeChange = dates => {
    const { dispatch, myShifts } = this.props;
    const lastDate = moment(dates[dates.length - 1]);
    const lastShift = myShifts.all[myShifts.all.length - 1];
    const lastShiftDate = moment(`${lastShift.date} ${lastShift.start}`);
    const { uid } = JSON.parse(localStorage.getItem('user'));
    if (lastDate.isAfter(lastShiftDate)) {
      dispatch(
        shiftsActions.getBookedForUser(
          uid,
          lastShiftDate.format(),
          lastDate.format()
        )
      );
    }
  };

  render() {
    const { myShifts, error, hasMore } = this.props;
    const { viewType } = this.state;

    if (!myShifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    let view = 'list';
    switch (viewType) {
      case 'list':
        view = (
          <InfiniteScroll
            dataLength={myShifts.all.length}
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
            <ShiftList type="booked" shifts={myShifts.all} />
          </InfiniteScroll>
        );
        break;
      case 'calendar':
        view = (
          <CalendarView
            shifts={myShifts.all}
            onRangeChange={this.handleCalendarRangeChange}
          />
        );
        break;
      default:
    }
    return (
      <Layout
        heading="My Upcoming Shifts"
        cornerComponent={
          <ViewSwitch
            handleListView={this.handleListView}
            handleCalendarView={this.handleCalendarView}
          />
        }
      >
        {myShifts.all.length === 0 ? (
          <h5>You have no upcoming shifts. Why not book one?</h5>
        ) : null}
        {view}
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
