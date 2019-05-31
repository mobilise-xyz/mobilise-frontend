import axios from 'axios';
import authHeader from '../_helpers/auth-header';

const placeholderRecommendedShifts = [
  {
    title: 'Chelsea Flower Show',
    description: 'Raising awareness for food shortage.',
    roles: [],
    id: 444
  }
]; // FIXME

const getAll = () => {
  // Get all shifts
  const config = {
    headers: authHeader()
  };
  return axios
    .get('/shifts', config)
    .then(r => ({
      all: r.data
    }))
    .catch(err => console.log(err)); // TODO go to error page
};

const getForUser = uid => {
  // Get all shifts
  const config = {
    headers: authHeader()
  };

  console.log(`Getting shifts for user ${uid}`);

  // TODO link with backend. Currently same as getAll.
  return axios
    .get(`/shifts/`, config)
    .then(r => ({
      all: r.data,
      recommended: placeholderRecommendedShifts
    }))
    .catch(err => console.log(err)); // TODO go to error page
};

const shiftsService = {
  getAll,
  getForUser
};

export default shiftsService;
