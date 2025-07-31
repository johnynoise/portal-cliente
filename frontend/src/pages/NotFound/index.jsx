import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/wasion.svg';
import {
  Container,
  Title,
  Message,
  Button
} from './notFound.styles';
import { Logo } from '../Cadastro/Cadastro.styles';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
        <Logo src={LogoImage} alt="Logo da aplicação" />
      <Title>404</Title>
      <Message>Página não encontrada.</Message>
      <Button onClick={() => navigate('/')}>Voltar ao login</Button>
    </Container>
  );
}

export default NotFound;
