import shiftsConstants from '../_constants/shifts.constants';

const applyToShifts = (shifts, action, f) => ({
  all: shifts.all.map(f),
  recommended: shifts.recommended.map(f)
});

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
    case shiftsConstants.BOOK_REQUEST: {
      // Search for the shift that requested to be booked.
      const setBookRequest = shift =>
        shift.id === action.id ? { ...shift, loading: true } : shift;
      console.log('STATE SHIFTS', state.shifts);
      return { shifts: applyToShifts(state.shifts, action, setBookRequest) };
    }
    case shiftsConstants.BOOK_SUCCESS: {
      // Search for the shift that requested to be booked.

      const setBookSuccess = shift =>
        shift.id === action.id
          ? { ...shift, bookSuccess: true, loading: false }
          : shift;

      return { shifts: applyToShifts(state.shifts, action, setBookSuccess) };
    }
    case shiftsConstants.BOOK_FAILURE: {
      // Search for the shift that requested to be booked.
      const setBookFailure = shift =>
        shift.id === action.id
          ? {
              ...shift,
              bookSuccess: false,
              loading: false,
              error: action.error
            }
          : shift;
      return { shifts: applyToShifts(state.shifts, action, setBookFailure) };
    }
    default:
      return state;
  }
};

export default shifts;
