import axios from 'axios';
import authHeader from '../_helpers/auth-header';
import utils from '../_helpers/utils';
import alertActions from '../_actions/alert.actions';

const placeholderShift = {
  id: -1,
  title: 'Loading...',
  description: null,
  creator: {
    user: {
      firstName: '',
      lastName: ''
    }
  },
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
    .catch(alertActions.error('There was a problem retrieving your shifts.'));
};

const getForUser = (uid, booked = false) => {
  // Get all shifts
  const config = {
    headers: authHeader(),
    params: {
      booked
    }
  };

  console.log(`Getting shifts for user ${uid}`);

  // TODO link with backend. Currently same as getAll.
  return axios
    .get(`/volunteers/${uid}/shifts`, config)
    .then(r => ({
      all: r.data,
      recommended: [placeholderShift]
    }))
    .catch(alertActions.error('There was a problem retrieving your shifts.'));
};

const deleteWithId = shiftId => {
  const config = {
    headers: authHeader()
  };

  console.log('Deleting shift with ID', shiftId);
  return axios.delete(`/shifts/${shiftId}`, config).then(utils.handleResponse);
};

const book = (shiftId, roleName, repeatedType, untilDate) => {
  const config = {
    headers: authHeader()
  };

  const data = {
    roleName,
    repeatedType,
    untilDate
  };

  console.log('Booking shift with ID', shiftId, 'and rolename', roleName);

  return axios.post(`shifts/${shiftId}/book`, data, config).then(resp => {
    console.log('handling resp', resp);
    utils.handleResponse(resp);
  });
};

const shiftsService = {
  getAll,
  getForUser,
  deleteWithId,
  book
};

export default shiftsService;
