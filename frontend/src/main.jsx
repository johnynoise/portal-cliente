import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos padrão do Toast
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home'; // Import Home component 
import PrivateRoute from './routes/PrivateRoutes'; // Import PrivateRoute for protected routes


import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>      
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
