// src/components/Layout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import LogoImage from '../../assets/wasion.svg';

import {
  Container,
  Navbar,
  LogoWrapper,
  Logo,
  NavItems,
  NavItem,
  LogoutButton,
  AdminButton
} from './layout.styles';

export default function Layout() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded?.role === 'admin';
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Container>
      <Navbar>
        <LogoWrapper>
          <Logo src={LogoImage} alt="Logo da Aplicação" />
        </LogoWrapper>

        <NavItems>
          <NavItem onClick={() => navigate('/home')}>Home</NavItem>
          <NavItem onClick={() => navigate('/solucoes-produtos')}>Produtos & Soluções</NavItem>
          <NavItem onClick={() => navigate('/arquivos')}>Arquivos</NavItem>
          <NavItem onClick={() => navigate('/suporte')}>Suporte</NavItem>
        </NavItems>

        {isAdmin && (
          <AdminButton onClick={() => navigate('/admin')}>Admin</AdminButton>
        )}

        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Navbar>

      <Outlet />
    </Container>
  );
}
