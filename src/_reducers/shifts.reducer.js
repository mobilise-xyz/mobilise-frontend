import shiftsConstants from '../_constants/shifts.constants';

const getAllShifts = shifts => shifts.all;
const getRecommendedShifts = shifts => shifts.recommended;

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
      console.log(state);
      console.log(action);

      // Search for the shift that requested to be booked.
      const allShifts = getAllShifts(state.shifts).map(shift =>
        shift.id === action.id ? { ...shift, loading: true } : shift
      );
      const recommendedShifts = getRecommendedShifts(state.shifts).map(shift =>
        shift.id === action.id ? { ...shift, loading: true } : shift
      );

      return {
        shifts: {
          all: allShifts,
          recommended: recommendedShifts
        }
      };
    }
    case shiftsConstants.BOOK_SUCCESS: {
      console.log(state);
      console.log(action);

      // Search for the shift that requested to be booked.
      const allShifts = getAllShifts(state.shifts).map(shift =>
        shift.id === action.id
          ? { ...shift, bookSuccess: true, loading: false }
          : shift
      );
      const recommendedShifts = getRecommendedShifts(state.shifts).map(shift =>
        shift.id === action.id
          ? { ...shift, bookSuccess: true, loading: false }
          : shift
      );

      return {
        shifts: {
          all: allShifts,
          recommended: recommendedShifts
        }
      };
    }
    case shiftsConstants.BOOK_FAILURE: {
      console.log(state);
      console.log(action);

      // Search for the shift that requested to be booked.
      const allShifts = getAllShifts(state.shifts).map(shift =>
        shift.id === action.id
          ? {
              ...shift,
              bookSuccess: false,
              loading: false,
              error: action.error
            }
          : shift
      );
      const recommendedShifts = getRecommendedShifts(state.shifts).map(shift =>
        shift.id === action.id
          ? {
              ...shift,
              bookSuccess: false,
              loading: false,
              error: action.error
            }
          : shift
      );

      return {
        shifts: {
          all: allShifts,
          recommended: recommendedShifts
        }
      };
    }
    default:
      return state;
  }
};

export default shifts;
