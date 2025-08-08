import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';

import {
  Container,
  Logo,
  Form,
  Title,
  Input,
  Button,
  SecondaryButton,
} from './RedefinirSenha.styles';

import LogoImage from '../../assets/wasion.svg';

import * as z from 'zod';

// Schema Zod com validação para confirmação de senha
const resetPasswordSchema = z
  .object({
    novaSenha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmarSenha: z.string().min(6, 'Confirmação obrigatória'),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export default function RedefinirSenha() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data) {
    try {
      await fetch('http://localhost:3000/auth/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha: data.novaSenha }),
      }).then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Erro ao redefinir senha.');
        }
      });

      toast.success('Senha redefinida com sucesso! Redirecionando para login...');
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Container>
        <Logo src={LogoImage} alt="Logo" />

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Title>Redefinir Senha</Title>

          <Input
            type="password"
            placeholder="Nova senha"
            {...register('novaSenha')}
            aria-invalid={errors.novaSenha ? 'true' : 'false'}
          />
          {errors.novaSenha && (
            <p style={{ color: 'red', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              {errors.novaSenha.message}
            </p>
          )}

          <Input
            type="password"
            placeholder="Confirmar nova senha"
            {...register('confirmarSenha')}
            aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
          />
          {errors.confirmarSenha && (
            <p style={{ color: 'red', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              {errors.confirmarSenha.message}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Redefinir Senha'}
          </Button>

          <SecondaryButton type="button" onClick={() => navigate('/')}>
            Voltar ao Login
          </SecondaryButton>
        </Form>
      </Container>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </>
  );
}
