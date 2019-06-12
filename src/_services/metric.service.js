import axios from 'axios';
import authHeader from '../_helpers/auth-header';
import utils from '../_helpers/utils';

const get = () => {
  const config = {
    headers: authHeader()
  };

  return axios.get(`/metric`, config).then(utils.handleResponse);
};

const update = (name, verb, value) => {
  const data = {
    name,
    verb,
    value
  };
  const config = {
    headers: authHeader()
  };

  return axios.post(`/metric`, data, config);
};

const metricService = {
  get,
  update
};

export default metricService;
