import React, { useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Falha no login');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setError('Erro de conexão com o servidor');
    }
  };

  return (
    <Container>
      <Logo src={LogoImage} alt="Logo" />
      <Form onSubmit={handleLogin}>
        <Title>Login do Cliente</Title>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link>Esqueceu a senha?</Link>
        <Button type="submit">Entrar</Button>
        <SecondaryButton type="button" onClick={() => navigate('/cadastro')}>
          Criar Conta
        </SecondaryButton>
      </Form>
    </Container>
  );
}

export default Login;
