import React from 'react';
import { Spinner } from 'react-bootstrap';
import shiftsConstants from '../_constants/shifts.constants';
// state: {shifts: {all, recommended}}
const initialState = {
  shifts: {
    all: [
      {
        id: -1,
        title: 'Loading...',
        description: (
          <div className="shift-spinner">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ),
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
  console.log('Shifts', state);
  console.log('Action', action);
  switch (action.type) {
    case shiftsConstants.GETALL_REQUEST:
      return {
        shifts: state.shifts,
        loading: true
      };
    case shiftsConstants.GETALL_SUCCESS:
      console.log('GETALL SUCCESS', action.shifts);
      return {
        shifts: action.shifts
      };
    case shiftsConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};

export default shifts;
