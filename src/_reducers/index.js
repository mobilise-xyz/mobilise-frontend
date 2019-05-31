import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';
import shift from './shift.reducer';

const rootReducer = combineReducers({
  authentication,
  shifts,
  shift
});

export default rootReducer;
