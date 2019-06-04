import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage from './components/pages/NewShiftPage/NewShiftPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import SettingsPage from './components/pages/SettingsPage';
import SignUpPage from './components/pages/SignUpPage';
import AvailabilityPage from './components/pages/AvailabilityPage';
import RecommendedShiftHelpPage from './components/pages/HelpPages/RecommendedShiftsHelpPage';
import FeedBackPage from './components/pages/HelpPages/FeedbackPage';

const App = () => (
  <Switch>
    <PrivateRoute path="/" exact component={ShiftsPage} />
    <PrivateRoute path="/shifts" exact component={MyShiftsPage} />
    <PrivateRoute path="/new-shift" exact component={NewShiftPage} />
    <PrivateRoute path="/settings" exact component={SettingsPage} />
    <PrivateRoute path="/availability" exact component={AvailabilityPage} />

    <PrivateRoute
      path="/help/recommended"
      exact
      component={RecommendedShiftHelpPage}
    />
    <PrivateRoute path="/help/feedback" exact component={FeedBackPage} />

    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route path="/404" exact component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
);

export default App;
