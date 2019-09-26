import axios from 'axios';
import utils from '../_helpers/utils';
import authHeader from '../_helpers/auth-header';

const getAll = () => {
  const config = {
    headers: authHeader()
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

const addContact = (uid, firstName, lastName, email, telephone, relation) => {
  const config = {
    headers: authHeader()
  };

  return axios
    .post(
      `/volunteers/${uid}/contacts`,
      {
        firstName,
        lastName,
        email,
        telephone,
        relation
      },
      config
    )
    .then(utils.handleResponse);
};

const getContacts = uid => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/volunteers/${uid}/contacts`, config)
    .then(utils.handleResponse);
};

const removeContact = (uid, id) => {
  const config = {
    headers: authHeader()
  };

  return axios
    .delete(`/volunteers/${uid}/contacts/${id}`, config)
    .then(utils.handleResponse);
};

const volunteerService = {
  getAll,
  removeContact,
  addContact,
  getContacts,
  getContributions,
  getHallOfFame,
  getActivity
};

export default volunteerService;
