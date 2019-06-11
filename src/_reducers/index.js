import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';
import alert from './alert.reducer';
import availability from './availability.reducer';
import volunteers from './volunteers.reducer';
import user from './user.reducer';

const rootReducer = combineReducers({
  authentication,
  shifts,
  alert,
  availability,
  volunteers,
  user
});

export default rootReducer;
