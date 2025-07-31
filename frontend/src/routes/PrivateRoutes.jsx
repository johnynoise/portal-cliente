// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para login
  if (!token) {
    return <Navigate to="/" />;
  }

  // Se houver token, renderiza o componente protegido
  return children;
}

export default PrivateRoute;
