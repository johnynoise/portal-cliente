import React, { useEffect } from 'react';
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

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Se quiser redirecionar automaticamente após 5 segundos
    const timeout = setTimeout(() => {
      if (token) {
        // Se logado, vai para home
        navigate('/home');
      } else {
        // Se não logado, vai para login
        navigate('/');
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Container>
      <Logo src={LogoImage} alt="Logo da aplicação" />
      <Title>404</Title>
      <Message>Página não encontrada.</Message>
      <Button
        onClick={() => {
          const token = localStorage.getItem('token');
          if (token) {
            navigate('/home');
          } else {
            navigate('/');
          }
        }}
      >
        Voltar
      </Button>
      <Message style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#666' }}>
        Você será redirecionado automaticamente em 5 segundos.
      </Message>
    </Container>
  );
}

export default NotFound;
