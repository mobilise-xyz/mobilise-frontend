// For IE support.
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import history from './_helpers/history';
import store from './_helpers/store';
import './index.css';
import ConnectedApp from './App';
import * as serviceWorker from './serviceWorker';
import userService from './_services/user.service';

// Axios configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Intercept 401
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      // Logout automatically if a 401 is received.
      userService.logout();
      history.push('/login');
    }
    return error;
  }
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ConnectedApp />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
