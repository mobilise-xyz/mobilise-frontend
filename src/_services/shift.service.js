import axios from 'axios';
import utils from './utils.service';
import authHeader from '../_helpers/auth-header';

const deleteWithId = shiftId => {
  const config = {
    headers: authHeader()
  };

  console.log('Deleting shift');

  return axios.delete(`/shifts/${shiftId}`, config).then(utils.handleResponse);
};

const shiftService = {
  deleteWithId
};

export default shiftService;
