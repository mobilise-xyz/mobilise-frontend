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
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));

    dispatch(shiftsActions.getBookedForUser(uid));
  };

  render() {
    const { myShifts, loading, error } = this.props;
    const { viewType } = this.state;

    if (loading === true || !myShifts) {
      return null;
    }

    console.log(myShifts);
    if (error) {
      return <p>error</p>;
    }

    let view = 'list';
    switch (viewType) {
      case 'list':
        view = <ShiftList type="booked" shifts={myShifts.all} />;
        break;
      case 'calendar':
        view = <CalendarView shifts={myShifts.all} />;
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
  const { myShifts, loading, error } = state.shifts;
  return {
    myShifts,
    loading,
    error
  };
};

export default connect(mapStateToProps)(MyShiftsPage);
