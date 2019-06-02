import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import shifts from './shifts.reducer';

const rootReducer = combineReducers({
  authentication,
  shifts
});

export default rootReducer;
