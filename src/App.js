import React from 'react';
import { Switch, Route } from 'react-router';
import ShiftsPage from './components/pages/HomePage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import './App.css';

const App = () => (
  <Switch>
    <Route path="/" exact component={ShiftsPage} />
    <Route path="/shifts" exact component={MyShiftsPage} />
  </Switch>
);

export default App;
