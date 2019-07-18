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
    .then(data => {
      const { shifts } = data;
      return { all: shifts };
    })
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
    .then(data => {
      const { shifts } = data;
      return {
        all: shifts,
        recommended: [placeholderShift]
      };
    })
    .catch(alertActions.error('There was a problem retrieving your shifts.'));
};

const deleteWithId = shiftId => {
  const config = {
    headers: authHeader()
  };

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

  return axios
    .post(`shifts/${shiftId}/book`, data, config)
    .then(utils.handleResponse);
};

const cancel = (shiftId, reason) => {
  const headers = authHeader();

  const data = {
    reason
  };

  return axios
    .delete(`/shifts/${shiftId}/booking`, { headers, data })
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
  cancel,
  updateInfo,
  updateRoles,
  ping
};

export default shiftsService;
