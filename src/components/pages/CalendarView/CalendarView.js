import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import MyToolbar from './MyToolbar';
import MyEvent from './MyEvent';
import ShiftCardModal from '../../ShiftCard/ShiftCardModal';

moment.locale('uk', {
  week: {
    dow: 1,
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const customComponents = { event: MyEvent, toolbar: MyToolbar };

// TODO use redux instead.
const defaultShiftdata = {
  id: -1,
  title: 'Loading...',
  description: null,
  creator: {
    user: {
      firstName: '',
      lastName: ''
    }
  },
  requirements: [
    {
      numberRequired: 0,
      role: {
        name: 'Loading...'
      }
    }
  ]
};

class CalendarView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      selectedShiftData: defaultShiftdata
    };
  }

  toggleModal = e => {
    if (e !== false && e !== undefined) {
      const { shiftData } = e;
      this.setState({ selectedShiftData: shiftData });
    }
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { shifts, isAdmin } = this.props;
    const { showModal, selectedShiftData } = this.state;

    const events = shifts.map(s => ({
      start: moment(`${s.date} ${s.start}`).toDate(),
      end: moment(`${s.date} ${s.stop}`).toDate(),
      allDay: false,
      resource: null,
      title: s.title,
      shiftData: s,
      showModal,
      toggleModal: this.toggleModal
    }));

    const eventSelector = isAdmin ? () => {} : this.toggleModal;

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
            onSelectEvent={eventSelector}
            onDrillDown={() => {}}
            timeslots={1}
            scrollToTime={moment('07:00:00', 'HH:mm:ss').toDate()}
          />
        </div>
        <ShiftCardModal
          isAdmin={isAdmin}
          shiftData={selectedShiftData}
          show={showModal}
          onHide={this.toggleModal}
          type="booked"
        />
      </Card>
    );
  }
}

export default CalendarView;
