// src/routes/PrivateRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('Sem token, redirecionando para login');
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
