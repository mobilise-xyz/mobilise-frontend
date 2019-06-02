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

const deleteWithId = shiftId => {
  const config = {
    headers: authHeader()
  };

  console.log('Deleting shift with ID', shiftId);

  return axios.delete(`/shifts/${shiftId}`, config).then(utils.handleResponse);
};

const bookWithIdAndRole = (shiftId, roleName) => {
  const config = {
    headers: authHeader()
  };

  const data = {
    roleName
  };

  console.log('Booking shift with ID', shiftId, 'and rolename', roleName);

  return axios.post(`shifts/${shiftId}/book`, config, data).then(resp => {
    console.log('handling resp', resp);
    utils.handleResponse(resp);
  });
};

const shiftsService = {
  getAll,
  getForUser,
  deleteWithId,
  bookWithIdAndRole
};

export default shiftsService;
