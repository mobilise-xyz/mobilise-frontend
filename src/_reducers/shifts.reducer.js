import moment from 'moment';
import shiftsConstants from '../_constants/shifts.constants';

const ITEMS_PER_PAGE = 5;

const combineShifts = (oldShifts, newShifts) => {
  return [
    ...oldShifts,
    ...newShifts.filter(shift => oldShifts.every(s => shift.id !== s.id))
  ];
};

const shifts = (state = {}, action) => {
  // Helper method to set the state of a shift.
  const setShiftState = (newState, shiftsToMap = state.shifts) =>
    shiftsToMap.map(shift =>
      shift.id === action.id
        ? {
            ...shift,
            ...newState
          }
        : shift
    );

  switch (action.type) {
    case shiftsConstants.GETALL_REQUEST:
    case shiftsConstants.GETFORUSER_REQUEST:
      return {
        ...state,
        shifts: state.shifts,
        loading: true,
        hasMore: true
      };
    case shiftsConstants.GETFIRST_SUCCESS: {
      return {
        ...state,
        shifts: action.shifts,
        startTime: moment().format(),
        hasMore: action.shifts.length === ITEMS_PER_PAGE,
        loading: false
      };
    }
    case shiftsConstants.GETBOOKEDFIRST_SUCCESS: {
      return {
        ...state,
        myShifts: action.myShifts,
        startTime: moment().format(),
        hasMore: action.myShifts.length === ITEMS_PER_PAGE,
        loading: false
      };
    }
    case shiftsConstants.GETALL_SUCCESS:
    case shiftsConstants.GETFORUSER_SUCCESS: {
      const newShifts = combineShifts(state.shifts, action.shifts);
      return {
        ...state,
        shifts: newShifts,
        hasMore: action.shifts.length === ITEMS_PER_PAGE,
        loading: false
      };
    }
    case shiftsConstants.GETALL_FAILURE:
    case shiftsConstants.GETFORUSER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case shiftsConstants.GETBOOKEDFORUSER_REQUEST:
      return {
        ...state,
        myShifts: state.myShifts,
        loading: true
      };
    case shiftsConstants.GETBOOKEDFORUSER_SUCCESS: {
      const myNewShifts = combineShifts(state.myShifts, action.myShifts);
      return {
        ...state,
        myShifts: myNewShifts,
        hasMore: action.myShifts.length === ITEMS_PER_PAGE,
        loading: false
      };
    }
    case shiftsConstants.GETBOOKEDFORUSER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case shiftsConstants.DELETE_REQUEST: {
      return {
        ...state,
        shifts: setShiftState({ loading: true })
      };
    }
    case shiftsConstants.DELETE_SUCCESS: {
      return {
        ...state,
        shifts: state.shifts.filter(s => action.id !== s.id)
      };
    }
    case shiftsConstants.DELETE_FAILURE: {
      return {
        ...state,
        shifts: setShiftState({
          deleteSuccess: false,
          loading: false,
          error: action.error
        })
      };
    }
    case shiftsConstants.BOOK_REQUEST: {
      // Search for the shift that requested to be booked.
      return {
        ...state,
        shifts: setShiftState({
          loading: true
        })
      };
    }
    case shiftsConstants.BOOK_SUCCESS: {
      const newBookings = [];
      action.ids.forEach(id => {
        // Search for the shift that requested to be booked.
        const newBooking = state.shifts.find(s => s.id === id);
        // It might not be loaded yet
        if (!newBooking) {
          return;
        }
        // If loaded, then set whether the particular role was booked
        for (let i = 0; i < newBooking.requirements.length; i += 1) {
          const req = newBooking.requirements[i];
          req.booked = req.role.name === action.roleName;
          newBooking.requirements[i] = req;
        }
        newBookings.push(newBooking);
      });
      const currentBookings = state.myShifts ? state.myShifts : [];
      return {
        ...state,
        shifts: state.shifts.filter(s => action.ids.indexOf(s.id) < 0),
        myShifts: [...currentBookings, ...newBookings]
      };
    }
    case shiftsConstants.BOOK_FAILURE: {
      // Search for the shift that requested to be booked.
      return {
        ...state,
        shifts: setShiftState({
          bookSuccess: false,
          loading: false,
          error: action.error
        })
      };
    }
    case shiftsConstants.CANCEL_REQUEST: {
      // Search for the shift that requested to be booked.
      return {
        ...state,
        myShifts: setShiftState(
          {
            loading: true
          },
          state.myShifts
        )
      };
    }
    case shiftsConstants.CANCEL_SUCCESS: {
      // Search for the shift that requested to be booked.
      const cancelledShift = state.myShifts.find(s => s.id === action.id);
      const currentShifts = state.shifts ? state.shifts : [];
      return {
        ...state,
        shifts: [...currentShifts, cancelledShift],
        myShifts: state.myShifts.filter(s => s.id !== action.id)
      };
    }
    case shiftsConstants.CANCEL_FAILURE: {
      return {
        ...state,
        myShifts: setShiftState(
          {
            cancelSuccess: false,
            loading: false,
            error: action.error
          },
          state.myShifts
        )
      };
    }
    case shiftsConstants.UPDATE_REQUEST: {
      return {
        ...state,
        shifts: setShiftState({
          loading: true
        })
      };
    }
    case shiftsConstants.UPDATE_SUCCESS: {
      const setUpdateSuccess = shift => {
        // Find the shift to update.
        if (shift.id === action.id) {
          const { title, description, address, start, stop } = action.data;
          const newRoles = action.data.rolesRequired;
          const requirementsCopy = [...shift.requirements];

          // Update the number required for each role
          newRoles.forEach(newRole => {
            const requirementToUpdateIndex = requirementsCopy.findIndex(
              r => r.role.name === newRole.roleName
            );
            requirementsCopy[requirementToUpdateIndex] = {
              ...shift.requirements[requirementToUpdateIndex],
              numberRequired: newRole.number
            };
          });

          return {
            ...shift,
            title,
            description,
            address,
            start,
            stop,
            requirements: requirementsCopy,
            updateSuccess: true,
            loading: false
          };
        }

        return shift;
      };
      return {
        ...state,
        shifts: state.shifts.map(setUpdateSuccess)
      };
    }
    case shiftsConstants.UPDATE_FAILURE: {
      // Search for the shift that requested to be booked.
      return {
        ...state,
        shifts: setShiftState({
          updateSuccess: false,
          loading: false,
          error: action.error
        })
      };
    }
    case shiftsConstants.PINGALL_REQUEST: {
      return state;
    }
    case shiftsConstants.PINGALL_SUCCESS: {
      return {
        ...state,
        shifts: setShiftState({
          pingSuccess: true,
          loading: false
        })
      };
    }
    case shiftsConstants.PINGALL_FAILURE: {
      return {
        ...state,
        shifts: setShiftState({
          pingSuccess: false,
          loading: false,
          error: action.error
        })
      };
    }
    default:
      return state;
  }
};

export default shifts;
