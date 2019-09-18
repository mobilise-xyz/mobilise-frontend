import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';
import alert from './alert.reducer';
import availability from './availability.reducer';
import volunteers from './volunteers.reducer';
import user from './users.reducer';
import metric from './metric.reducer';
import files from './files.reducer';
import links from './links.reducer';
import usersConstants from '../_constants/users.constants';

const appReducer = combineReducers({
  authentication,
  shifts,
  alert,
  availability,
  volunteers,
  user,
  links,
  metric,
  files
});

const rootReducer = (state, action) => {
  if (action.type === usersConstants.LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
