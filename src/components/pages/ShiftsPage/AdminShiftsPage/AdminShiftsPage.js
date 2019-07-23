import React from 'react';
import {
  Col,
  ToggleButton,
  ToggleButtonGroup,
  OverlayTrigger,
  Spinner,
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

  fetchInitialShifts = () => {
    const { dispatch } = this.props;
    const now = moment().format();
    dispatch(shiftsActions.getAll(now, 1, true));
  };

  fetchMoreShifts = () => {
    const { dispatch, page } = this.props;
    const now = moment().format();
    dispatch(shiftsActions.getAll(now, page));
  };

  refresh = () => {
    this.fetchInitialShifts();
  };

  render() {
    const { shifts, hasMore, error, page } = this.props;
    console.log(shifts);
    console.log(page);
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
            <ShiftList isAdmin shifts={shifts.all} />
          </InfiniteScroll>
        );
        break;
      case 'calendar':
        view = <CalendarView isAdmin shifts={shifts.all} />;
        break;
      default:
    }

    return (
      <Layout
        cornerComponent={
          <ViewSwitch
            handleListView={this.handleListView}
            handleCalendarView={this.handleCalendarView}
          />
        }
      >
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
  const { shifts, page, loading, hasMore, error } = state.shifts;
  return {
    shifts,
    page,
    loading,
    hasMore,
    error
  };
};

export default connect(mapStateToProps)(AdminShiftsPage);
