import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ path, ...props }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export default PrivateRoute;
