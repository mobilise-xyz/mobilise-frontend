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
  console.log('GET ALL SERVICE');

  return axios
    .get('/shifts', config)
    .then(r => {
      console.log(r);
      return {
        all: r.data,
        recommended: placeholderRecommendedShifts
      };
    })
    .catch(err => console.log(err)); // TODO go to error page
};

const shiftsService = {
  getAll
};

export default shiftsService;
