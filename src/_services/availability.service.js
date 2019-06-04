import axios from 'axios';
import utils from '../_helpers/utils';
import authHeader from '../_helpers/auth-header';

const get = uid => {
  const config = {
    headers: authHeader()
  };

  axios
    .get(`/volunteers/${uid}/availability`, config)
    .then(utils.handleResponse);
};

const transposeArray = array =>
  array[0].map((col, i) => array.map(row => row[i]));

const availabilityToInteger = {
  AVAILABILITY_AVAILABLE: '2',
  AVAILABILITY_MAYBE: '1',
  AVAILABILITY_UNAVAILABLE: '0'
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

  axios.put(`/volunteers/${uid}/availability`, data, config);
};

const availbilityService = {
  get,
  update
};

export default availbilityService;
