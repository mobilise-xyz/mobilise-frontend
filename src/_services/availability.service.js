import axios from 'axios';
import utils from '../_helpers/utils';
import authHeader from '../_helpers/auth-header';
import alertActions from '../_actions/alert.actions';

const transposeArray = array =>
  array[0].map((col, i) => array.map(row => row[i]));

const availabilityToInteger = {
  AVAILABILITY_AVAILABLE: '2',
  AVAILABILITY_MAYBE: '1',
  AVAILABILITY_UNAVAILABLE: '0'
};

const integerToAvailability = {
  '2': 'AVAILABILITY_AVAILABLE',
  '1': 'AVAILABILITY_MAYBE',
  '0': 'AVAILABILITY_UNAVAILABLE'
};

const get = uid => {
  const config = {
    headers: authHeader()
  };

  return axios
    .get(`/volunteers/${uid}/availability`, config)
    .then(utils.handleResponse)
    .then(data => {
      const { availability } = data;
      return transposeArray(availability);
    })
    .then(arr => arr.map(i => i.map(j => integerToAvailability[j])))
    .catch(alertActions.error('Could not get availability.'));
};

const update = (uid, availability) => {
  const config = {
    headers: authHeader()
  };

  // Transform the availability to fit a format the API expects.

  const newAvailability = transposeArray(availability).map(i =>
    i.map(j => availabilityToInteger[j])
  );

  const data = {
    availability: newAvailability
  };

  return axios
    .put(`/volunteers/${uid}/availability`, data, config)
    .catch(alertActions.error('Could not update availability.'));
};

const availabilityService = {
  get,
  update
};

export default availabilityService;
