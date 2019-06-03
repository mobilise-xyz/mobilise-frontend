import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';
import alert from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  shifts,
  alert
});

export default rootReducer;
