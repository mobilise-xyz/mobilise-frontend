import React from 'react';
import { Col, ToggleButton, ToggleButtonGroup, OverlayTrigger, Tooltip  } from 'react-bootstrap';
import moment from 'moment';
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
    const { dispatch } = this.props;
    const now = moment().format();
    dispatch(shiftsActions.getAll(now));
  }

  handleListView = () => {
    this.setState({ viewType: 'list' });
  };

  handleCalendarView = () => {
    this.setState({ viewType: 'calendar' });
  };

  render() {
    const { shifts, loading, error } = this.props;
    const { viewType } = this.state;

    if (loading === true || !shifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    let view = 'list';
    switch (viewType) {
      case 'list':
        view = <ShiftList isAdmin shifts={shifts.shifts.all} />;
        break;
      case 'calendar':
        view = <CalendarView isAdmin shifts={shifts.shifts.all} />;
        break;
      default:
    }

    return (
      <Layout cornerComponent={
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
  const { shifts, loading, error } = state.shifts;
  return {
    shifts,
    loading,
    error
  };
};

export default connect(mapStateToProps)(AdminShiftsPage);
