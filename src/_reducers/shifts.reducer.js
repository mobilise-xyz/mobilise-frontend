import shiftsConstants from '../_constants/shifts.constants';

// Utility function that applies a function to all and recommended shifts and
// returns the appropriate state.
const applyToShifts = (shifts, action, f) => ({
  all: shifts.all.map(f),
  recommended: shifts.recommended ? shifts.recommended.map(f) : undefined
});

const shifts = (state = {}, action) => {
  // Helper method to set the state of a shift.
  const setShiftState = (newState, shiftsToMap = state.shifts) =>
    applyToShifts(shiftsToMap, action, shift =>
      shift.id === action.id
        ? {
            ...shift,
            ...newState
          }
        : shift
    );

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
    case shiftsConstants.GETBOOKEDFORUSER_REQUEST:
      return {
        ...state,
        myShifts: state.myShifts,
        loading: true
      };
    case shiftsConstants.GETBOOKEDFORUSER_SUCCESS:
      return {
        ...state,
        myShifts: action.myShifts,
        loading: false
      };
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
        shifts: setShiftState({ deleteSuccess: true, loading: false })
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
      // Search for the shift that requested to be booked.
      return {
        ...state,
        shifts: setShiftState({
          bookSuccess: true,
          loading: false
        })
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
      return {
        ...state,
        myShifts: setShiftState(
          {
            cancelSuccess: true,
            loading: false
          },
          state.myShifts
        )
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
          // loading: true
        })
      };
    }
    case shiftsConstants.UPDATE_SUCCESS: {
      const setUpdateSuccess = shift => {
        // TODO this information should be updated for all fields, not just requirements

        // Find the shift to update.
        if (shift.id === action.id) {
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
            requirements: requirementsCopy,
            updateSuccess: true,
            loading: false
          };
        }

        return shift;
      };
      return {
        ...state,
        shifts: applyToShifts(state.shifts, action, setUpdateSuccess)
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
