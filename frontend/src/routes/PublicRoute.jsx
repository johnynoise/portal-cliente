// src/routes/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');

  // Se já está logado (tem token), redireciona para /home
  if (token) {
    return <Navigate to="/home" replace />;
  }

  // Senão, permite acesso ao componente filho (login, cadastro etc)
  return children;
}

export default PublicRoute;
