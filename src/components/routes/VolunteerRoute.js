import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Wraps routes that should only be available to Volunteers.
const VolunteerRoute = ({ component: Component, ...rest }) => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <PrivateRoute>
      <Route
        {...rest}
        render={props =>
          !isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/404', state: { from: props.location } }}
            />
          )
        }
      />
    </PrivateRoute>
  );
};

export default VolunteerRoute;
