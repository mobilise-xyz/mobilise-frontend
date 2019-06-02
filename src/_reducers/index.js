import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';
import alert from './alert.reducer';
import availability from './availability.reducer';

const rootReducer = combineReducers({
  authentication,
  shifts,
  alert,
  availability
});

export default rootReducer;
