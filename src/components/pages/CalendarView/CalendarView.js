import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import shiftsActions from '../../../_actions/shifts.actions';
import CardLayout from '../../CardLayout';
import MyToolbar from './MyToolbar';

moment.locale('uk', {
  week: {
    dow: 1,
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const MyEvent = ({ title }) => <div>{title}</div>;

const customComponents = { event: MyEvent, toolbar: MyToolbar };

class CalendarView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(shiftsActions.getAll());
  }

  render() {
    const { shifts } = this.props;
    console.log('SHIFTS', shifts);
    const events = shifts.shifts.all.map(s => ({
      start: moment(`${s.date} ${s.start}`).toDate(),
      end: moment(`${s.date} ${s.stop}`).toDate(),
      allDay: false,
      resource: null,
      title: s.title
    }));

    return (
      <CardLayout>
        <div style={{ height: '60rem' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            components={customComponents}
          />
        </div>
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts } = state;
  return {
    shifts
  };
};

export default connect(mapStateToProps)(CalendarView);
