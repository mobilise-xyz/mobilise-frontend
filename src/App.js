import React from 'react';
import { Switch, Route } from 'react-router';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage1 from './components/pages/new-shift-pages/NewShiftPage1';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => (
  <Switch>
    <Route path="/" exact component={ShiftsPage} />
    <Route path="/shifts" exact component={MyShiftsPage} />
    <Route path="/new-shift" exact component={NewShiftPage1} />
    <Route path="/login" exact component={LoginPage} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
