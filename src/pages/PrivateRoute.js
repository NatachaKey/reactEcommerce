import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later

const PrivateRoute = () => {
  return <h4>Private Route</h4>;
};
export default PrivateRoute;
