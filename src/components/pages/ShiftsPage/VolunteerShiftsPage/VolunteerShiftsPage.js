import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../../Layout/Layout';
import ShiftList from '../../../ShiftList';
import './VolunteerShiftsPage.css';
import shiftsActions from '../../../../_actions/shifts.actions';

class VolunteerShiftsPage extends React.Component {
  // TODO Handle exception properly.
  componentDidMount() {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getForUser(uid));
  }

  render() {
    const { shifts } = this.props;
    console.log('SHIFTS', shifts);
    return (
      <Layout>
        <ShiftList
          heading={<DateHeading weekday="Recommended" />}
          shifts={shifts.shifts.recommended}
          // TODO what is this color
          cardStyle={{ backgroundColor: 'green' }}
        />
        {/* TODO divider between each day */}
        <hr />
        {/* TODO remove hardcoding */}
        <ShiftList
          heading={<DateHeading weekday="Today" date="17th March" />}
          shifts={shifts.shifts.all}
        />
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

const DateHeading = ({ weekday, date }) => (
  <>
    <h3>{weekday}</h3>
    <p>{date}</p>
  </>
);
