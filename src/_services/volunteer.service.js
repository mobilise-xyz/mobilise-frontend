import axios from 'axios';
import utils from '../_helpers/utils';
import authHeader from '../_helpers/auth-header';

const getAll = (approved, sortBy) => {
  const config = {
    headers: authHeader(),
    params: {
      approved,
      sortBy
    }
  };

  return axios.get(`/volunteers`, config).then(utils.handleResponse);
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
  getAll,
  getContributions,
  getHallOfFame,
  getActivity
};

export default volunteerService;
