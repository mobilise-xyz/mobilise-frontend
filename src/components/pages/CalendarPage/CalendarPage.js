import React from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { shiftStatus } from '../../Shift';
import CalendarView from '../CalendarView';
import Layout from '../../Layout/Layout';

class CalendarPage extends React.Component {
  render() {
    const { shifts, error } = this.props;

    if (!shifts) {
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
        <CalendarView shifts={shifts.all} type={shiftStatus.NONE} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { shifts, myShifts } = state.shifts;
  return {
    shifts,
    myShifts
  };
};

export default connect(mapStateToProps)(CalendarPage);
