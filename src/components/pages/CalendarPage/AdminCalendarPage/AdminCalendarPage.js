import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import CalendarView from '../../CalendarView';
import shiftsActions from '../../../../_actions/shifts.actions';

class AdminCalendarPage extends React.Component {
  componentDidMount() {
    const startDate = moment().startOf('week');
    const lastDate = moment().endOf('week');
    this.retrieveShiftsInRange(startDate, lastDate);
  }

  handleCalendarRangeChange = dates => {
    const startDate = moment(dates[0]).startOf('week');
    const lastDate = moment(dates[0]).endOf('week');

    this.retrieveShiftsInRange(startDate, lastDate);
  };

  retrieveShiftsInRange = (startDate, lastDate) => {
    const { dispatch } = this.props;
    let { shifts } = this.props;
    let firstTime = false;
    if (!shifts) {
      firstTime = true;
      shifts = [];
    }
    const lastShift = shifts[shifts.length - 1];
    let lastShiftDate = moment();
    if (lastShift) {
      lastShiftDate = moment(`${lastShift.date} ${lastShift.start}`);
    }
    if (lastDate.isAfter(lastShiftDate)) {
      dispatch(
        shiftsActions.getAll(
          startDate.format(),
          lastDate.format(),
          null,
          firstTime
        )
      );
    }
  };

  render() {
    const { shifts, error } = this.props;

    if (!shifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <CalendarView
        isAdmin
        shifts={shifts}
        myShifts={[]}
        onRangeChange={this.handleCalendarRangeChange}
      />
    );
  }
}

const mapStateToProps = state => {
  const { shifts, error } = state.shifts;
  return {
    shifts,
    error
  };
};

export default connect(mapStateToProps)(AdminCalendarPage);
