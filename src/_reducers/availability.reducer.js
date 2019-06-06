import availabilityConstants from '../_constants/availability.constants';

const generateInitialGrid = () => {
  const grid = [];
  for (let i = 0; i < 3; i += 1) {
    grid[i] = [];
    for (let j = 0; j < 7; j += 1) {
      grid[i][j] = availabilityConstants.UNAVAILABLE;
    }
  }
  return grid;
};

const availability = (state = generateInitialGrid(), action) => {
  switch (action.type) {
    case availabilityConstants.AVAILABLE:
    case availabilityConstants.UNAVAILABLE:
    case availabilityConstants.MAYBE: {
      return state.map((time, timeIndex) =>
        timeIndex === action.time
          ? time.map((day, dayIndex) =>
              dayIndex === action.day ? action.type : day
            )
          : time
      );
    }
    case availabilityConstants.UPDATE: {
      return state;
    }
    case availabilityConstants.GET: {
      return action.availability;
    }
    default: {
      return state;
    }
  }
};

export default availability;
