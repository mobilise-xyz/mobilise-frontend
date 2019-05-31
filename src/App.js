import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import VolunteerShiftsPage from './components/pages/VolunteerShiftsPage/VolunteerShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage from './components/pages/NewShiftPage/NewShiftPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import SettingsPage from './components/pages/SettingsPage';
import SignUpPage from './components/pages/SignUpPage';

const App = () => (
  <Switch>
    <PrivateRoute path="/" exact component={VolunteerShiftsPage} />
    <PrivateRoute path="/shifts" exact component={MyShiftsPage} />
    <PrivateRoute path="/new-shift" exact component={NewShiftPage} />
    <PrivateRoute path="/settings" exact component={SettingsPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route path="/404" exact component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
);

export default App;
