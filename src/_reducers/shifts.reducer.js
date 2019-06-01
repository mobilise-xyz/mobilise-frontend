import shiftsConstants from '../_constants/shifts.constants';
// state: {shifts: {all, recommended}}
const placeholderShift = {
  id: -1,
  title: 'Loading...',
  description: null,
  requirements: [
    {
      numberRequired: 0,
      role: {
        name: 'Loading...'
      }
    }
  ]
};

const initialState = {
  shifts: {
    all: [placeholderShift],
    recommended: [placeholderShift] // FIXME
  }
};

const shifts = (state = initialState, action) => {
  switch (action.type) {
    // GET
    case shiftsConstants.GETFORUSER_REQUEST || shiftsConstants.GETALL_REQUEST:
      return {
        shifts: state.shifts,
        loading: true
      };
    case shiftsConstants.GETFORUSER_SUCCESS || shiftsConstants.GETALL_SUCCESS:
      return {
        shifts: action.shifts
      };
    case shiftsConstants.GETFORUSER_FAILURE || shiftsConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};

export default shifts;
