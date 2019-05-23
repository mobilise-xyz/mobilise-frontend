import React from 'react';
import { Route } from 'react-router';
import HomePage from './components/pages/HomePage';
import Container from 'react-bootstrap/Container';
import './App.css';

const App = () => (
  <Container>
      <Route path="/" exact component={ HomePage }/>
  </Container>
);

export default App;
