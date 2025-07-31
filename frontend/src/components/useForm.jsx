import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../pages/Cadastro/validationSchema'; // Schema Zod para validação

import {
  Form,
  Input,
  Button,
  PasswordRules,
} from '../pages/Cadastro/Cadastro.styles'; // Estilos do formulário

import { SecondaryButton } from '../pages/Login/Login.styles'; // Estilo botão secundário

import { ToastContainer, toast } from 'react-toastify'; // Toast para notificações
import 'react-toastify/dist/ReactToastify.css'; // Estilos do toast

function UserForm({ onSubmit, onError, submitLabel = 'Salvar', onNavigateBack }) {
  // Configuração do React Hook Form com validação via Zod
  const {
    register,                 // Função para registrar inputs no form
    handleSubmit,             // Função para lidar com o submit do form
    formState: { errors },    // Objeto com erros de validação de cada campo
    reset,                    // Função para resetar os valores do formulário
  } = useForm({
    resolver: zodResolver(userSchema), // Validação usando o schema Zod
  });

  // Quando o componente montar, resetar os valores do formulário para estado inicial
  useEffect(() => {
    reset();
  }, [reset]);

  // Função intermediária que chama a função onSubmit recebida via props
  // Passa junto o reset e funções do toast para controle do formulário externo
  function handleFormSubmit(data) {
    // onSubmit(data, resetForm, showSuccessToast, showErrorToast)
    onSubmit(data, reset, toast.success, toast.error);
  }

  return (
    <>
      {/* Formulário controlado pelo React Hook Form */}
      <Form onSubmit={handleSubmit(handleFormSubmit, onError)}>
        {/* Campo Nome Completo */}
        <Input placeholder="Nome Completo" {...register('name')} />
        
        {/* Campo Email */}
        <Input placeholder="Email" type="email" {...register('email')} />
        
        {/* Campo Empresa */}
        <Input placeholder="Empresa" {...register('empresa')} />
        
        {/* Campo Telefone */}
        <Input placeholder="Telefone" type="tel" {...register('telefone')} />
        
        {/* Campo Senha */}
        <Input placeholder="Senha" type="password" {...register('password')} />
        
        {/* Regras de senha exibidas abaixo do input senha */}
        <PasswordRules>
          • Mínimo 8 caracteres<br />
          • Pelo menos uma letra maiúscula<br />
          • Um número<br />
          • Um caractere especial (!@#$%)
        </PasswordRules>
        
        {/* Campo para confirmar a senha */}
        <Input placeholder="Confirme a Senha" type="password" {...register('confirmPassword')} />
        
        {/* Exibe mensagem de erro específica do campo confirmar senha */}
        <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>
        
        {/* Botão de envio do formulário */}
        <Button type="submit">{submitLabel}</Button>
        
        {/* Botão secundário para voltar, chama função passada por props */}
        <SecondaryButton type="button" onClick={onNavigateBack}>
          Voltar para Login
        </SecondaryButton>
      </Form>

      {/* Container do Toast para exibir notificações */}
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </>
  );
}

export default UserForm;
