import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import './VolunteerShiftsPage.css';
import shiftsActions from '../../../../_actions/shifts.actions';

class VolunteerShiftsPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getForUser(uid, false));
  }

  render() {
    const { shifts } = this.props;
    const shiftMap = [];
    let i = 0;
    let j = 0;
    while (i < shifts.shifts.all.length) {
      const shift = shifts.shifts.all[i];
      const shiftDate = moment(shift.date, 'YYYY-MM-DD');
      const shiftsForDate = [shift];
      i += 1;
      while (i < shifts.shifts.all.length) {
        const nextShift = shifts.shifts.all[i];
        if (shiftDate.isSame(moment(nextShift.date, 'YYYY-MM-DD'))) {
          shiftsForDate.push(nextShift);
        } else {
          break;
        }
        i += 1;
      }
      shiftDate.isValid();
      shiftMap[j] = [shiftDate, shiftsForDate];
      j += 1;
    }
    const shiftLists = [];
    shiftMap.forEach(entry => {
      shiftLists.push(
        <ShiftList
          key={`ShiftList${entry[0]}`}
          heading={entry[0].format('dddd')}
          subheading={entry[0].format('Do MMM')}
          shifts={entry[1]}
        />
      );
    });
    return (
      <Layout>
        <ShiftList
          heading="Recommended"
          subheading={<Link to="/help/recommended">what&#39;s this?</Link>}
          shifts={shifts.shifts.recommended}
          cardClass="bg-primary"
        />
        {shiftLists}
        <hr />
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

export default connect(mapStateToProps)(VolunteerShiftsPage);
