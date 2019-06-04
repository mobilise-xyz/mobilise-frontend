import axios from 'axios';
import utils from '../_helpers/utils';
import authHeader from '../_helpers/auth-header';

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
    .then(availability =>
      transposeArray(availability).map(i =>
        i.map(j => integerToAvailability[j])
      )
    );
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

  return axios.put(`/volunteers/${uid}/availability`, data, config);
};

const availbilityService = {
  get,
  update
};

export default availbilityService;
