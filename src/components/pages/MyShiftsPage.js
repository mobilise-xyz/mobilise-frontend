import React from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import ShiftList from '../ShiftList';
import shiftsActions from '../../_actions/shifts.actions';

class MyShiftsPage extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(shiftsActions.getForUser(uid, true));
  };

  render() {
    const { shifts } = this.props;
    return (
      <Layout>
        <ShiftList clickableCards={false} shifts={shifts.shifts.all} />
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

export default connect(mapStateToProps)(MyShiftsPage);
