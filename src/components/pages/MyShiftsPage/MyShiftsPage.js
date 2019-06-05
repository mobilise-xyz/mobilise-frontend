import React from 'react';
import { connect } from 'react-redux';
import { Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './MyShiftsPage.css';
import Layout from '../../Layout';
import ShiftList from '../../ShiftList';
import shiftsActions from '../../../_actions/shifts.actions';
import CalendarView from '../CalendarView/CalendarView';

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
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getForUser(uid, true));
  };

  render() {
    const { shifts } = this.props;
    const { viewType } = this.state;

    let view = 'list';
    switch (viewType) {
      case 'list':
        view = <ShiftList clickableCards={false} shifts={shifts.shifts.all} />;
        break;
      case 'calendar':
        view = <CalendarView shifts={shifts.shifts.all} />;
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
        {view}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts } = state;
  return {
    shifts
  };
};

export default connect(mapStateToProps)(MyShiftsPage);
