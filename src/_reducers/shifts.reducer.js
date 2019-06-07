import shiftsConstants from '../_constants/shifts.constants';

// Utility function that applies a function to all and recommended shifts and
// returns the appropriate state.
const applyToShifts = (shifts, action, f) => ({
  all: shifts.all.map(f),
  recommended: shifts.recommended ? shifts.recommended.map(f) : undefined
});

// state: {shifts: {all, recommended}}
const placeholderShift = {
  id: -1,
  title: 'Loading...',
  description: null,
  creator: {
    user: {
      firstName: '',
      lastName: ''
    }
  },
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
  loading: false,
  shifts: {
    all: [placeholderShift],
    recommended: [placeholderShift] // FIXME
  }
};

// TODO This is very messy, multiple cases can be collapsed and there are many unused state fields..
const shifts = (state = initialState, action) => {
  switch (action.type) {
    // GET
    case shiftsConstants.GETALL_REQUEST:
    case shiftsConstants.GETFORUSER_REQUEST:
      return {
        ...state,
        shifts: state.shifts,
        loading: true
      };
    case shiftsConstants.GETALL_SUCCESS:
    case shiftsConstants.GETFORUSER_SUCCESS:
      return {
        ...state,
        shifts: action.shifts,
        loading: false
      };
    case shiftsConstants.GETALL_FAILURE:
    case shiftsConstants.GETFORUSER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case shiftsConstants.DELETE_REQUEST: {
      const setDeleteRequest = shift =>
        shift.id === action.id ? { ...shift, loading: true } : shift;
      return { shifts: applyToShifts(state.shifts, action, setDeleteRequest) };
    }
    case shiftsConstants.DELETE_SUCCESS: {
      const setBookSuccess = shift =>
        shift.id === action.id
          ? { ...shift, deleteSuccess: true, loading: false }
          : shift;
      return { shifts: applyToShifts(state.shifts, action, setBookSuccess) };
    }
    case shiftsConstants.DELETE_FAILURE: {
      const setBookFailure = shift =>
        shift.id === action.id
          ? {
              ...shift,
              deleteSuccess: false,
              loading: false,
              error: action.error
            }
          : shift;
      return { shifts: applyToShifts(state.shifts, action, setBookFailure) };
    }
    case shiftsConstants.BOOK_REQUEST: {
      // Search for the shift that requested to be booked.
      const setBookRequest = shift =>
        shift.id === action.id ? { ...shift, loading: true } : shift;
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
    case shiftsConstants.UPDATE_REQUEST: {
      const setUpdateRequest = shift =>
        shift.id === action.id ? { ...shift, loading: true } : shift;
      return { shifts: applyToShifts(state.shifts, action, setUpdateRequest) };
    }
    case shiftsConstants.UPDATE_SUCCESS: {
      // Search for the shift that requested to be booked.
      const setUpdateSuccess = shift =>
        shift.id === action.id
          ? { ...shift, updateSuccess: true, loading: false }
          : shift;
      return { shifts: applyToShifts(state.shifts, action, setUpdateSuccess) };
    }
    case shiftsConstants.UPDATE_FAILURE: {
      // Search for the shift that requested to be booked.
      const setUpdateFailure = shift =>
        shift.id === action.id
          ? {
              ...shift,
              updateSuccess: false,
              loading: false,
              error: action.error
            }
          : shift;
      return {
        shifts: applyToShifts(state.shifts, action, setUpdateFailure)
      };
    }
    default:
      return state;
  }
};

export default shifts;
