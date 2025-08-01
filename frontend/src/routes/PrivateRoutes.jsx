// src/routes/PrivateRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PrivateRoute({ children, roleRequired }) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('Sem token, redirecionando para login');
    return <Navigate to="/" replace />;
  }

  try {
    const user = jwtDecode(token);

    if (roleRequired && user.role !== roleRequired) {
      console.log('Role insuficiente, redirecionando');
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.log('Token inválido, redirecionando para login');
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;

