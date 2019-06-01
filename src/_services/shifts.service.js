import axios from 'axios';
import authHeader from '../_helpers/auth-header';
import utils from './utils.service';

const placeholderShift = {
  id: -1,
  title: 'Loading...',
  description: null,
  requirements: [
    {
      numberRequired: 0,
      role: {
        name: 'Loading...'
      }
    }
  ]
};

const getAll = () => {
  // Get all shifts
  const config = {
    headers: authHeader()
  };
  return axios
    .get('/shifts', config)
    .then(r => ({
      all: r.data
    }))
    .catch(err => console.log(err)); // TODO go to error page
};

const getForUser = uid => {
  // Get all shifts
  const config = {
    headers: authHeader()
  };

  console.log(`Getting shifts for user ${uid}`);

  // TODO link with backend. Currently same as getAll.
  return axios
    .get(`/shifts/`, config)
    .then(r => ({
      all: r.data,
      recommended: [placeholderShift]
    }))
    .catch(utils.handleResponse); // TODO go to error page
};

const shiftsService = {
  getAll,
  getForUser
};

export default shiftsService;
