import availabilityConstants from '../_constants/availability.constants';

const available = (time, day) => ({
  type: availabilityConstants.AVAILABLE,
  time,
  day
});

const maybe = (time, day) => ({
  type: availabilityConstants.MAYBE,
  time,
  day
});

const unavailable = (time, day) => ({
  type: availabilityConstants.UNAVAILABLE,
  time,
  day
});

const availabilityActions = {
  available,
  maybe,
  unavailable
};

export default availabilityActions;