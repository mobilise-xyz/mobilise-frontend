import axios from 'axios';
import utils from '../_helpers/utils';
import authHeader from '../_helpers/auth-header';

const getAll = approved => {
  const config = {
    headers: authHeader(),
    params: {
      approved
    }
  };

  return axios.get(`/volunteers`, config).then(utils.handleResponse);
};

const approve = uid => {
  const config = {
    headers: authHeader()
  };

  return axios
    .post(`/volunteers/${uid}/approve`, {}, config)
    .then(utils.handleResponse);
};

const getContributions = uid => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/volunteers/${uid}/stats`, config)
    .then(utils.handleResponse);
};

const getHallOfFame = () => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/volunteers/hall-of-fame`, config)
    .then(utils.handleResponse);
};

const getActivity = uid => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/volunteers/${uid}/activity`, config)
    .then(utils.handleResponse)
    .then(({ myActivity }) => ({ activity: myActivity }));
};

const volunteerService = {
  approve,
  getAll,
  getContributions,
  getHallOfFame,
  getActivity
};

export default volunteerService;
