import React from 'react';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import MyToolbar from './MyToolbar';
import ShiftEvent from './ShiftEvent';
import shiftTypes from '../../../__types/shifts.types';
import { shiftStatus } from '../../Shift';
import './CalendarView.css';

moment.locale('uk', {
  week: {
    dow: 1,
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const customComponents = { event: ShiftEvent, toolbar: MyToolbar };

const eventStyleGetter = () => ({
  className: 'bg-primary',
  style: { padding: 0, border: 0 }
});

const CalendarView = props => {
  const { shifts, myShifts, isAdmin, onRangeChange } = props;

  const recommendedRoleNames = [];

  const shiftEvents = shifts.map(s => {
    s.requirements.forEach(req => {
      if (req.recommended) {
        recommendedRoleNames.push(req.role.roleName);
      }
    });

    return {
      title: s.title,
      start: moment(`${s.date} ${s.start}`).toDate(),
      end: moment(`${s.date} ${s.stop}`).toDate(),
      shiftData: s,
      isAdmin,
      recommendedRoleNames,
      type: shiftStatus.NONE
    };
  });

  const bookedEvents = myShifts.map(s => {
    s.requirements.forEach(req => {
      if (req.recommended) {
        recommendedRoleNames.push(req.role.roleName);
      }
    });

    return {
      title: s.title,
      start: moment(`${s.date} ${s.start}`).toDate(),
      end: moment(`${s.date} ${s.stop}`).toDate(),
      shiftData: s,
      isAdmin,
      recommendedRoleNames,
      type: shiftStatus.BOOKED
    };
  });

  return (
    <Card className="p-3">
      <div style={{ height: '75vh' }}>
        <BigCalendar
          localizer={localizer}
          events={[...shiftEvents, ...bookedEvents]}
          defaultView="week"
          components={customComponents}
          onRangeChange={onRangeChange || (() => {})}
          onDrillDown={() => {}}
          timeslots={1}
          scrollToTime={moment('09:00:00', 'HH:mm:ss').toDate()}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </Card>
  );
};

CalendarView.defaultProps = {
  isAdmin: false
};

CalendarView.propTypes = {
  shifts: PropTypes.arrayOf(shiftTypes.shift).isRequired,
  isAdmin: PropTypes.bool
};

export default CalendarView;
