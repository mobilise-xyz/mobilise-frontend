import axios from 'axios';
import authHeader from '../_helpers/auth-header';
import utils from '../_helpers/utils';

const get = () => {
  const config = {
    headers: authHeader()
  };

  return axios.get(`/files`, config).then(utils.handleResponse);
};

const filesService = {
  get
};

export default filesService;
