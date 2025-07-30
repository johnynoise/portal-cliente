import React from 'react';
import {
  Container,
  Logo,
  Form,
  Title,
  Input,
  Button,
  Link,
  SecondaryButton
} from './Login.styles';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/wasion.svg';

function Login() {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src={LogoImage} alt="Logo" />
      <Form>
        <Title>Login do Cliente</Title>
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Senha" name="senha" />
        <Link>Esqueceu a senha?</Link>
        <Button type="submit" onClick={() => navigate('/home')}>Entrar</Button>
        <SecondaryButton type="button" onClick={() => navigate('/cadastro')}>
          Criar Conta
        </SecondaryButton>

      </Form>
    </Container>
  );
}

export default Login;
