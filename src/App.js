import React from 'react';
import { Switch, Route } from 'react-router';
import ShiftsPage from './components/pages/HomePage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import LoginPage from './components/pages/LoginPage';
import './App.css';

const App = () => (
  <Switch>
    <Route path="/" exact component={ShiftsPage} />
    <Route path="/shifts" exact component={MyShiftsPage} />
    <Route path="/login" exact component={LoginPage} />
  </Switch>
);

export default App;
