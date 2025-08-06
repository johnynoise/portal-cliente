import React, { useState } from 'react';
import { Container, Form, Input, Button, Message, Title } from './RecuperarSenha.styles';
import { toast } from 'react-toastify';
import api from '../../services/api';


export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Digite um e-mail válido.');
      return;
    }

    try {
      await api.post('/auth/recuperar-senha', { email });
      setEnviado(true);
    } catch (error) {
      toast.error('Erro ao enviar e-mail de recuperação.');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Recuperar Senha</Title>
        {enviado ? (
          <Message>Verifique sua caixa de entrada para redefinir sua senha.</Message>
        ) : (
          <>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button type="submit">Enviar</Button>
          </>
        )}
      </Form>
    </Container>
  );
}
