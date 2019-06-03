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

const availability = (state = generateInitialGrid(), action) =>
  state.map((time, timeIndex) =>
    timeIndex === action.time
      ? time.map((day, dayIndex) =>
          dayIndex === action.day ? action.type : day
        )
      : time
  );

export default availability;
