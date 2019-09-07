import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import CalendarView from '../CalendarView';
import Layout from '../../Layout/Layout';
import shiftsActions from '../../../_actions/shifts.actions';

class CalendarPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const startDate = moment().startOf('week');
    const lastDate = moment().endOf('week');
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(
      shiftsActions.getAvailableForUser(
        uid,
        startDate.format(),
        lastDate.format(),
        null,
        true
      )
    );
    dispatch(
      shiftsActions.getBookedForUser(
        uid,
        startDate.format(),
        lastDate.format(),
        null,
        true
      )
    );
  }

  exportCalendar = () => {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));

    dispatch(shiftsActions.getCalendarForUser(uid));
  };

  handleCalendarRangeChange = dates => {
    const { dispatch } = this.props;
    const startDate = moment(dates[0]).startOf('week');
    const lastDate = moment(dates[0]).endOf('week');
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(
      shiftsActions.getAvailableForUser(
        uid,
        startDate.format(),
        lastDate.format()
      )
    );
    dispatch(
      shiftsActions.getBookedForUser(uid, startDate.format(), lastDate.format())
    );
  };

  render() {
    const { shifts, myShifts, error } = this.props;

    if (!shifts && !myShifts) {
      return null;
    }

    if (error) {
      return <p>error</p>;
    }

    return (
      <Layout heading="All Shifts" cornerComponent={null}>
        <Col style={{ textAlign: 'right', zIndex: '0' }}>
          <Button variant="outline-primary" onClick={this.exportCalendar}>
            Export
          </Button>
        </Col>
        <CalendarView
          shifts={shifts.all}
          myShifts={myShifts.all}
          onRangeChange={this.handleCalendarRangeChange}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts, myShifts, error } = state.shifts;
  return {
    shifts,
    myShifts,
    error
  };
};

export default connect(mapStateToProps)(CalendarPage);
