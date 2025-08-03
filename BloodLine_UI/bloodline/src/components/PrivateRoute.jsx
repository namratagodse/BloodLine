import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const role =
      decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
      return children;
    }

    return <Navigate to="/unauthorized" replace />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
