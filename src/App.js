import React from 'react';
import { Switch, Route } from 'react-router';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => (
  <Switch>
    <Route path="/" exact component={ShiftsPage} />
    <Route path="/shifts" exact component={MyShiftsPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
