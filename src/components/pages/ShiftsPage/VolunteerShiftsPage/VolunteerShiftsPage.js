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
    dispatch(shiftsActions.getForUser(uid, false));
  }

  render() {
    const { shifts } = this.props;
    return (
      <Layout>
        <ShiftList
          heading="Recommended"
          shifts={shifts.shifts.recommended}
          cardClass="bg-primary"
        />
        {/* TODO divider between each day */}
        <hr />
        {/* TODO remove hardcoding */}
        <ShiftList
          heading="Today"
          subheading="17th March"
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
