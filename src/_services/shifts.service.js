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

const getAll = after => {
  // Get all shifts
  const config = {
    headers: authHeader(),
    params: {
      after
    }
  };
  return axios
    .get('/shifts', config)
    .then(utils.handleResponse)
    .then(data => ({
      all: data
    }))
    .catch(alertActions.error('There was a problem retrieving your shifts.'));
};

const getForUser = (uid, booked = false, after) => {
  // Get all shifts
  const config = {
    headers: authHeader(),
    params: {
      booked,
      after
    }
  };

  return axios
    .get(`/volunteers/${uid}/shifts`, config)
    .then(utils.handleResponse)
    .then(data => ({
      all: data,
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

  return axios
    .post(`shifts/${shiftId}/book`, data, config)
    .then(utils.handleResponse);
};

const updateInfo = (shiftId, { title, description, address }) => {
  const config = {
    headers: authHeader()
  };

  const data = {
    title,
    description,
    address
  };

  return axios
    .put(`/shifts/${shiftId}`, data, config)
    .then(utils.handleResponse);
};

const updateRoles = (shiftId, rolesRequired) => {
  const config = {
    headers: authHeader()
  };

  const data = {
    rolesRequired
  };

  return axios
    .put(`/shifts/${shiftId}/rolesRequired`, data, config)
    .then(utils.handleResponse);
};

const ping = shiftId => {
  const config = {
    headers: authHeader()
  };

  return axios
    .post(`/shifts/${shiftId}/ping`, {}, config)
    .then(utils.handleResponse);
};

const shiftsService = {
  getAll,
  getForUser,
  deleteWithId,
  book,
  updateInfo,
  updateRoles,
  ping
};

export default shiftsService;
