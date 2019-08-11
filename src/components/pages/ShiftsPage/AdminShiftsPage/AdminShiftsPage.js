import React from 'react';
import {
  Button,
  Col,
  OverlayTrigger,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from 'react-bootstrap';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import shiftsActions from '../../../../_actions/shifts.actions';
import './AdminShiftsPage.css';
import CalendarView from '../../CalendarView';

const ITEMS_PER_PAGE = 5;

// TODO: remove duplication between here and MyShiftsPage
const ViewSwitch = ({ handleListView, handleCalendarView }) => (
  <Col>
    <ToggleButtonGroup type="radio" name="viewOptions" defaultValue={1}>
      <ToggleButton value={1} onClick={handleListView}>
        List
      </ToggleButton>
      <ToggleButton value={2} onClick={handleCalendarView}>
        Calendar
      </ToggleButton>
    </ToggleButtonGroup>
  </Col>
);

class AdminShiftsPage extends React.Component {
  state = {
    viewType: 'list'
  };

  // TODO Handle exception properly.
  componentDidMount() {
    this.fetchInitialShifts();
  }

  handleListView = () => {
    this.setState({ viewType: 'list' });
  };

  handleCalendarView = () => {
    this.setState({ viewType: 'calendar' });
  };

  handleCalendarRangeChange = dates => {
    const { dispatch, shifts } = this.props;
    const lastDate = moment(dates[dates.length - 1]);
    const lastShift = shifts.all[shifts.all.length - 1];

    if (!lastShift) {
      return;
    }

    const lastShiftDate = moment(`${lastShift.date} ${lastShift.start}`);
    if (lastDate.isAfter(lastShiftDate)) {
      dispatch(shiftsActions.getAll(lastShiftDate.format(), lastDate.format()));
    }
  };

  exportCalendar = () => {
    const { dispatch } = this.props;
    dispatch(shiftsActions.getCalendarForAll());
  };

  fetchInitialShifts = () => {
    const { dispatch } = this.props;
    const now = moment().format();
    dispatch(shiftsActions.getAll(now, null, 1, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, startTime, shifts } = this.props;
    const { length } = shifts.all;
    const page = length / ITEMS_PER_PAGE;
    dispatch(shiftsActions.getAll(startTime, null, page + 1));
  };

  render() {
    const { shifts, hasMore, error } = this.props;
    const { viewType } = this.state;
    if (!shifts) {
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
            dataLength={shifts.all.length}
            next={this.fetchMoreShifts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>No more shifts coming up!</b>
              </p>
            }
          >
            <ShiftList isAdmin shifts={shifts.all} />
          </InfiniteScroll>
        );
        break;
      case 'calendar':
        view = (
          <CalendarView
            isAdmin
            shifts={shifts.all}
            onRangeChange={this.handleCalendarRangeChange}
          />
        );
        break;
      default:
    }

    return (
      <Layout
        heading="Upcoming Shifts"
        cornerComponent={
          <ViewSwitch
            handleListView={this.handleListView}
            handleCalendarView={this.handleCalendarView}
          />
        }
      >
        <Col style={{ textAlign: 'right', zIndex: '0' }}>
          <Button variant="outline-primary" onClick={this.exportCalendar}>
            Export Calendar
          </Button>
        </Col>
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
        {view}
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
