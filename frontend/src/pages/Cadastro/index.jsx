import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Trash from '../../assets/wasion.svg';
import api from '../../services/api';

import {
  Container,
  Logo,
  Form,
  Title,
  Input,
  Button,
  Card,
  CardInfo,
  CardButton,
  PasswordRules,
} from './Cadastro.styles';

import { SecondaryButton } from '../Login/Login.styles';

// Importa React Hook Form e Zod para validação de formulário
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from './validationSchema';  // Schema Zod customizado

// Importa Toastify para notificações visuais (toast)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastro() {
  // Estado para armazenar a lista de usuários cadastrados
  const [users, setUsers] = useState([]);

  // Estado para armazenar mensagens de erro de validação (array)
  const [formErrors, setFormErrors] = useState([]);

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // React Hook Form com integração ao Zod para validação automática
  const {
    register,           // Função para "registrar" inputs no formulário
    handleSubmit,       // Função que gerencia o submit do formulário
    formState: { errors }, // Objeto com erros individuais de cada campo (não usado diretamente aqui)
    reset,              // Função para limpar o formulário após sucesso
  } = useForm({
    resolver: zodResolver(userSchema), // Passa o schema Zod para validação
  });

  // Ao montar o componente, busca a lista de usuários no backend
  useEffect(() => {
    getUsers();
  }, []);

  // Função para buscar usuários via API e atualizar o estado local
  async function getUsers() {
    const response = await api.get('/usuarios');
    setUsers(response.data);
  }

  // Função chamada quando o formulário é enviado e válido
  async function onSubmit(data) {
    setFormErrors([]); // Limpa erros anteriores

    // Monta o objeto para enviar para o backend
    const newUser = {
      name: data.name,
      email: data.email,
      empresa: data.empresa,
      telefone: data.telefone,
      password: data.password,
    };

    try {
      // Envia requisição POST para cadastro
      await api.post('/usuarios', newUser);

      // Mostra toast de sucesso
      toast.success('Usuário cadastrado com sucesso!');

      // Atualiza a lista de usuários para refletir novo cadastro
      getUsers();

      // Limpa o formulário para novo cadastro
      reset();

      // Redireciona para a tela de login após 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      // Se backend retornar erro específico, mostra mensagem do backend
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        // Caso contrário, mostra mensagem genérica
        toast.error('Erro ao cadastrar. Tente novamente.');
      }
    }
  }

  // Função chamada quando a validação do Zod falha
  function onError(formErrorData) {
    // Extrai todas as mensagens de erro para um array simples
    const messages = Object.values(formErrorData).map((error) => error.message);

    // Atualiza estado com mensagens para exibir no card de erros
    setFormErrors(messages);
  }

  // Função para apagar usuário pelo id
  async function deleteUsers(userId) {
    await api.delete(`/usuarios/${userId}`);
    getUsers(); // Atualiza lista após exclusão

    // Mostra toast informando exclusão
    toast.info('Usuário removido.');
  }

  return (
    <Container>
      <Logo src={Trash} alt="Logo" />

      {/* Formulário com onSubmit que chama onSubmit se válido ou onError se inválido */}
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Title>Cadastro de Usuários</Title>

        {/* Card que mostra os erros gerais do formulário */}
        {formErrors.length > 0 && (
          <div
            style={{
              background: '#ffe5e5',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              color: '#c00',
            }}
          >
            <strong>Verifique os campos:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
              {formErrors.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Inputs com registro no React Hook Form */}
        <Input placeholder="Nome Completo" {...register('name')} />
        <Input placeholder="Email Válido" type="email" {...register('email')} />
        <Input placeholder="Empresa" {...register('empresa')} />
        <Input placeholder="(xx) xxxxx-xxxx" type="tel" {...register('telefone')} />
        <Input placeholder="Senha" type="password" {...register('password')} />

        {/* Regras de senha exibidas abaixo */}
        <PasswordRules>
          • Mínimo 8 caracteres<br />
          • Pelo menos uma letra maiúscula<br />
          • Pelo menos um número<br />
          • Um caractere especial (!@#$%)
        </PasswordRules>

        <Input placeholder="Confirme a Senha" type="password" {...register('confirmPassword')} />

        {/* Botões */}
        <Button type="submit">Cadastrar</Button>
        <SecondaryButton type="button" onClick={() => navigate('/')}>
          Voltar para Login
        </SecondaryButton>
      </Form>

      {/* Lista de usuários cadastrados com botão para apagar */}
      {users.map((user) => (
        <Card key={user.id}>
          <CardInfo>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Empresa: {user.empresa}</p>
            <CardButton onClick={() => deleteUsers(user.id)}>Apagar</CardButton>
          </CardInfo>
        </Card>
      ))}

      {/* Container para as notificações toast */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </Container>
  );
}

export default Cadastro;
