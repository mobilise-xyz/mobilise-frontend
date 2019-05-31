import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const AdminRoute = ({ component: Component, ...rest }) => (
  <PrivateRoute>
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('user') ? ( // TODO Check if admin
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

export default AdminRoute;
