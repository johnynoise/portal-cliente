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
import Layout from './components/Navbar/LayoutNavbar';
import AdminProdutos from './pages/Admins/Produtos';
import AdminGerenciarProdutos from './pages/Admins/AdminProdutos';
import AdminDashboard from './pages/Admins/AdminDashboard';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/cadastro" element={<PublicRoute><Cadastro /></PublicRoute>} />

        {/* Rotas protegidas com layout persistente */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/solucoes-produtos" element={<SolucoesProdutos />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute roleRequired={'admin'}>
                <AdminDashboard />
              </PrivateRoute>
            }

          />
          <Route
            path="/admin/produtos"
            element={
              <PrivateRoute roleRequired={'admin'}>
                <AdminGerenciarProdutos />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
        <Route
          path="/admin/produtos/criar"
          element={
            <PrivateRoute roleRequired={'admin'}>
              <AdminProdutos />
            </PrivateRoute>
          }
        />

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </StrictMode>
);
