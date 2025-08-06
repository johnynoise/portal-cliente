import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Importa o schema de validação criado com Zod
import { loginSchema } from './loginSchema';
// Importa funções de utilitário para exibir toasts
import { showSuccess, showError } from './toast';

// Importa componentes estilizados para estrutura visual da página
import {
  Container,
  Logo,
  Form,
  Title,
  Input,
  Button,
  Link,
  SecondaryButton,
} from './Login.styles';

// Importa a imagem da logo
import LogoImage from '../../assets/wasion.svg';

export default function Login() {
  const navigate = useNavigate();

  // useForm do React Hook Form com integração ao Zod
  const {
    register, // Registra os inputs para validação e coleta de dados
    handleSubmit, // Função que lida com envio do formulário
    formState: { errors, isSubmitting }, // Objeto contendo erros e estado de envio
  } = useForm({
    resolver: zodResolver(loginSchema), // Usa o schema de validação
  });

  // Função executada ao submeter o formulário
  async function onSubmit(data) {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      // Se o login falhar, mostra toast de erro com a mensagem do backend
      if (!res.ok) {
        const err = await res.json();
        showError(err.error || 'Falha no login');
        return;
      }

      // Login bem-sucedido: armazena token e redireciona
      const responseData = await res.json();
      localStorage.setItem('token', responseData.token);
      showSuccess('Login efetuado com sucesso!');

      // Aguarda 1,5s e redireciona para a home
      setTimeout(() => navigate('/home'), 1500);
    } catch {
      // Se houver erro de rede, mostra toast de erro genérico
      showError('Erro de conexão com o servidor');
    }
  }

  return (
    <>
      {/* Container principal da página */}
      <Container>
        {/* Exibe a logo da empresa */}
        <Logo src={LogoImage} alt="Logo" />

        {/* Formulário de login */}
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Title>Login do Cliente</Title>

          {/* Campo de email */}
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {/* Exibe mensagem de erro para email */}
          {errors.email && (
            <p style={{ color: 'red', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              {errors.email.message}
            </p>
          )}

          {/* Campo de senha */}
          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {/* Exibe mensagem de erro para senha */}
          {errors.password && (
            <p style={{ color: 'red', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              {errors.password.message}
            </p>
          )}

          {/* Link para recuperação de senha */}
          <Link href="/recuperar-senha">Esqueceu a senha?</Link>

          {/* Botão de envio do formulário */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>

          {/* Botão secundário para ir para a página de cadastro */}
          <SecondaryButton type="button" onClick={() => navigate('/cadastro')}>
            Criar Conta
          </SecondaryButton>
        </Form>
      </Container>

      {/* Componente que exibe os toasts */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </>
  );
}
