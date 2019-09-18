import axios from 'axios';
import authHeader from '../_helpers/auth-header';
import utils from '../_helpers/utils';

const getAll = () => {
  const config = {
    headers: authHeader()
  };

  return axios.get(`/links`, config).then(utils.handleResponse);
};

const add = link => {
  const config = {
    headers: authHeader()
  };
  return axios.post(`/links`, link, config).then(utils.handleResponse);
};

const remove = id => {
  const config = {
    headers: authHeader()
  };

  return axios.delete(`/links/${id}`, config).then(utils.handleResponse);
};

const linksService = {
  getAll,
  add,
  remove
};

export default linksService;
