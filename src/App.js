import React from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage1 from './components/pages/new-shift-pages/NewShiftPage1';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import SettingsPage from './components/pages/SettingsPage';

const App = () => (
  <Switch>
    <PrivateRoute path="/" exact component={ShiftsPage} />
    <PrivateRoute path="/shifts" exact component={MyShiftsPage} />
    <PrivateRoute path="/new-shift" exact component={NewShiftPage1} />
    <Route path="/login" exact component={LoginPage} />
    <PrivateRoute path="/settings" exact component={SettingsPage} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
