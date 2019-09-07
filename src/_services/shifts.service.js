import axios from 'axios';
import authHeader from '../_helpers/auth-header';
import utils from '../_helpers/utils';
import alertActions from '../_actions/alert.actions';
import history from '../_helpers/history';

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

const create = shiftData => {
  const config = {
    headers: authHeader()
  };

  return axios.post('/shifts', shiftData, config).then(() => {
    history.push('/');
  });
};

const getAll = (after, before, page) => {
  // Get all shifts
  const config = {
    headers: authHeader(),
    params: {
      after,
      before,
      page
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

const getAvailableForUser = (uid, after, before, page) => {
  const config = {
    headers: authHeader(),
    params: {
      after,
      before,
      page
    }
  };

  return axios
    .get(`/volunteers/${uid}/availableShifts`, config)
    .then(utils.handleResponse)
    .then(data => {
      const { shifts } = data;
      return {
        all: shifts,
        recommended: [placeholderShift]
      };
    })
    .catch(
      alertActions.error('There was a problem retrieving available shifts.')
    );
};

const getBookedForUser = (uid, after, before, page) => {
  const config = {
    headers: authHeader(),
    params: {
      after,
      before,
      page
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

const getCalendarForUser = uid => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/volunteers/${uid}/shifts/calendar`, config)
    .then(utils.handleResponse)
    .then(({ link }) => {
      return window.open(link, '_self');
    });
};

const getCalendarForAll = () => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/shifts/calendar`, config)
    .then(utils.handleResponse)
    .then(({ link }) => {
      return window.open(link, '_self');
    });
};

const shiftsService = {
  create,
  getAll,
  getAvailableForUser,
  getCalendarForUser,
  getCalendarForAll,
  getBookedForUser,
  deleteWithId,
  book,
  cancel,
  updateInfo,
  updateRoles,
  ping
};

export default shiftsService;
