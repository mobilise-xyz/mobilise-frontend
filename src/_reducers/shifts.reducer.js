import shiftsConstants from '../_constants/shifts.constants';
// state: {shifts: {all, recommended}}
const initialState = {
  shifts: {
    all: [
      {
        id: -1,
        title: 'Loading...',
        description: null,
        roles: [
          {
            name: 'Loading...',
            involves: '',
            ShiftRole: { numberRequired: 0 }
          }
        ]
      }
    ],
    recommended: [
      {
        title: 'Chelsea Flower Show',
        description: 'Raising awareness for food shortage.',
        roles: [],
        id: 444
      }
    ] // FIXME
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
