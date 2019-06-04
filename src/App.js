import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import history from './_helpers/history';
import PrivateRoute from './components/PrivateRoute';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage from './components/pages/NewShiftPage/NewShiftPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import SettingsPage from './components/pages/SettingsPage';
import SignUpPage from './components/pages/SignUpPage';
import AvailabilityPage from './components/pages/AvailabilityPage';
import alertActions from './_actions/alert.actions';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    // Clear alerts on location change.
    history.listen(() => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    return (
      <Switch>
        <PrivateRoute path="/" exact component={ShiftsPage} />
        <PrivateRoute path="/shifts" exact component={MyShiftsPage} />
        <PrivateRoute path="/new-shift" exact component={NewShiftPage} />
        <PrivateRoute path="/settings" exact component={SettingsPage} />
        <PrivateRoute path="/availability" exact component={AvailabilityPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/404" exact component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  const { alert } = state;
  return {
    alert
  };
};

export default connect(mapStateToProps)(App);
