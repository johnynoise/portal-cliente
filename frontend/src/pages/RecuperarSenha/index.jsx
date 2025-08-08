import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../components/TelaLoading/Loading'

import {
  Container,
  Logo,
  Form,
  Input,
  Button,
  Title,
} from './RecuperarSenha.styles'; // Reaproveitando estilos do login

import LogoImage from '../../assets/wasion.svg'

import * as z from 'zod';

// Schema Zod para validar email
const recuperarSenhaSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
});

export default function RecuperarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(recuperarSenhaSchema),
  });

  async function onSubmit(data) {
    try {
      const res = await fetch('http://localhost:3000/auth/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao enviar e-mail de recuperação.');
      }

      toast.success('Verifique sua caixa de entrada para redefinir sua senha.');
    } catch (error) {
      toast.error(error.message);
    }
  }

return (
  <>
    {isSubmitting && <Loading />}

    <Container>
              <Logo src={LogoImage} alt="Logo" />
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>

        <Title>Recuperar Senha</Title>

        {isSubmitSuccessful ? (
          <p style={{ textAlign: 'center', color: '#004899' }}>
            Verifique sua caixa de entrada para redefinir sua senha.
          </p>
        ) : (
          <>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p style={{ color: 'red', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                {errors.email.message}
              </p>
            )}

            <Button type="submit" disabled={isSubmitting}>
              Enviar
            </Button>
          </>
        )}
      </Form>
    </Container>

    <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  </>
);
}
