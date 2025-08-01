// src/components/Layout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/wasion.svg';

import {
  Container,
  Navbar,
  LogoWrapper,
  Logo,
  NavItems,
  NavItem,
  LogoutButton,
} from './layout.styles';

export default function Layout() {
  const navigate = useNavigate();

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

        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Navbar>

      <Outlet />
    </Container>
  );
}
