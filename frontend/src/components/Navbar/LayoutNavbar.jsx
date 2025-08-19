// src/components/Layout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import LogoImage from '../../assets/wasion.svg';

import {
  Container,
  Navbar,
  LogoWrapper,
  Logo,
  NavItems,
  NavItem,
  ButtonsContainer,
  AdminButton,
  LogoutButton
} from './layout.styles';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <Container>
      <Navbar>
        <LogoWrapper>
          <Logo src={LogoImage} alt="Logo da Aplicação" />
        </LogoWrapper>

        <NavItems>
          <NavItem
            onClick={() => navigate('/home')}
            className={isActiveRoute('/home') ? 'active' : ''}
          >
            Home
          </NavItem>
          <NavItem
            onClick={() => navigate('/solucoes-produtos')}
            className={isActiveRoute('/solucoes-produtos') ? 'active' : ''}
          >
            Produtos & Soluções
          </NavItem>
          <NavItem
            onClick={() => navigate('/suporte')}
            className={isActiveRoute('/suporte') ? 'active' : ''}
          >
            Suporte
          </NavItem>
          <NavItem
            onClick={() => navigate('/faq')}
            className={isActiveRoute('/faq') ? 'active' : ''}
          >
            FAQ
          </NavItem>
        </NavItems>

        <ButtonsContainer>
          {isAdmin && (
            <AdminButton onClick={() => navigate('/admin')}>
              Admin
            </AdminButton>
          )}

          <LogoutButton onClick={handleLogout}>
            Sair
          </LogoutButton>
        </ButtonsContainer>
      </Navbar>

      <Outlet />
    </Container>
  );
}
