// For IE support.
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import history from './_helpers/history';
import store from './_helpers/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Axios configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
