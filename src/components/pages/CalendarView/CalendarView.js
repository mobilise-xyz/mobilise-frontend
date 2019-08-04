import React from 'react';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import MyToolbar from './MyToolbar';
import ShiftEvent from './ShiftEvent';
import shiftTypes from '../../../__types/shifts.types';

moment.locale('uk', {
  week: {
    dow: 1,
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const customComponents = { event: ShiftEvent, toolbar: MyToolbar };

const eventStyleGetter = () => ({
  className: 'card'
});

class CalendarView extends React.Component {
  render() {
    const { shifts, isAdmin, type, onRangeChange } = this.props;

    const recommendedRoleNames = [];

    const events = shifts.map(s => {
      s.requirements.forEach(req => {
        if (req.recommended) {
          recommendedRoleNames.push(req.role.roleName);
        }
      });

      return {
        start: moment(`${s.date} ${s.start}`).toDate(),
        end: moment(`${s.date} ${s.stop}`).toDate(),
        title: s.title,
        shiftData: s,
        isAdmin,
        recommendedRoleNames,
        type
      };
    });

    return (
      <Card className="p-3">
        <div style={{ height: '60rem' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            defaultView="week"
            components={customComponents}
            onRangeChange={onRangeChange || (() => {})}
            onDrillDown={() => {}}
            timeslots={1}
            scrollToTime={moment('07:00:00', 'HH:mm:ss').toDate()}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </Card>
    );
  }
}

CalendarView.defaultProps = {
  isAdmin: false
};

CalendarView.propTypes = {
  shifts: PropTypes.arrayOf(shiftTypes.shift).isRequired,
  isAdmin: PropTypes.bool
};

export default CalendarView;
