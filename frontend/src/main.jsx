import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home';
import SolucoesProdutos from './pages/Soluçoes&produtos';
import PrivateRoute from './routes/PrivateRoutes';
import NotFound from './pages/NotFound';
import PublicRoute from './routes/PublicRoute';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/cadastro" element={<PublicRoute><Cadastro /></PublicRoute>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/solucoes-produtos"
          element={
            <PrivateRoute>
              <SolucoesProdutos />
            </PrivateRoute>
          }
        />
        <Route path="/suporte" element={<PrivateRoute><div>Suporte</div></PrivateRoute>} />
        <Route path="*" element={<NotFound />} /> {/* <- pega qualquer rota inválida */}
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </StrictMode>
);
