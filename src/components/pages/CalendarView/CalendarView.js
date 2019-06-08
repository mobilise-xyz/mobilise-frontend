import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import MyToolbar from './MyToolbar';
import MyEvent from './MyEvent';

moment.locale('uk', {
  week: {
    dow: 1,
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const customComponents = { event: MyEvent, toolbar: MyToolbar };

class CalendarView extends React.Component {
  render() {
    const { shifts } = this.props;
    const events = shifts.map(s => ({
      start: moment(`${s.date} ${s.start}`).toDate(),
      end: moment(`${s.date} ${s.stop}`).toDate(),
      allDay: false,
      resource: null,
      title: s.title
    }));

    return (
      <Card className="p-3">
        <div style={{ height: '60rem' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            components={customComponents}
            onSelectEvent={this.onSelectEvent}
            onDrillDown={() => {}}
            timeslots={1}
            scrollToTime={moment('07:00:00', 'HH:mm:ss').toDate()}
          />
        </div>
      </Card>
    );
  }
}

export default CalendarView;
