import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';
import alert from './alert.reducer';
import availability from './availability.reducer';
import volunteers from './volunteers.reducer';
import user from './users.reducer';
import metric from './metric.reducers';

const rootReducer = combineReducers({
  authentication,
  shifts,
  alert,
  availability,
  volunteers,
  user,
  metric
});

export default rootReducer;
