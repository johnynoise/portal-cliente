import { useEffect, useState } from 'react';
import Trash from '../../assets/wasion.svg';       // Logo da aplicação
import api from '../../services/api';              // API configurada para requisições HTTP

// Estilos personalizados do componente Cadastro
import {
  Container,
  Logo,
  Card,
  CardInfo,
  CardButton,
} from './Cadastro.styles';

// Componente reutilizável do formulário de cadastro
import UserForm from '../../components/useForm';

// Hook para navegação entre páginas
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  // Estado para armazenar lista de usuários cadastrados
  const [users, setUsers] = useState([]);
  
  // Estado para armazenar mensagens gerais de erro do formulário
  const [formErrors, setFormErrors] = useState([]);
  
  // Hook para navegar programaticamente entre rotas
  const navigate = useNavigate();

  // useEffect executa apenas uma vez ao montar o componente
  // para carregar a lista de usuários cadastrados
  useEffect(() => {
    getUsers();
  }, []);

  // Função para buscar os usuários da API
  async function getUsers() {
    try {
      // Faz a requisição GET para a rota /usuarios
      const response = await api.get('/usuarios');
      // Atualiza o estado com os dados retornados
      setUsers(response.data);
    } catch {
      // Aqui você pode tratar erros de requisição (ex: mostrar toast)
    }
  }

  /**
   * Função chamada quando o formulário é submetido com dados válidos
   * @param {object} data - Dados do formulário
   * @param {function} resetForm - Função para resetar o formulário
   * @param {function} showSuccess - Função para mostrar toast de sucesso
   * @param {function} showError - Função para mostrar toast de erro
   */
  async function onSubmit(data, resetForm, showSuccess, showError) {
    // Limpa mensagens de erro anteriores
    setFormErrors([]);

    // Monta objeto para enviar ao backend
    const newUser = {
      name: data.name,
      email: data.email,
      empresa: data.empresa,
      telefone: data.telefone,
      password: data.password,
    };

    try {
      // Envia POST para cadastrar novo usuário
      await api.post('/usuarios', newUser);
      // Mostra notificação de sucesso
      showSuccess('Usuário cadastrado com sucesso!');
      // Atualiza a lista local de usuários
      getUsers();
      // Reseta os campos do formulário para entrada nova
      resetForm();

      // Após 3 segundos, redireciona para a página de login
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      // Se o backend retornar uma mensagem de erro específica, exibe ela
      if (err.response?.data?.error) {
        showError(err.response.data.error);
      } else {
        // Caso contrário, exibe mensagem genérica
        showError('Erro ao cadastrar. Tente novamente.');
      }
    }
  }

  /**
   * Função chamada quando o formulário possui erros de validação
   * @param {object} errors - Objeto contendo erros do formulário
   */
  function onError(errors) {
    // Extrai as mensagens dos erros e salva no estado para exibição
    const messages = Object.values(errors).map((e) => e.message);
    setFormErrors(messages);
  }

  /**
   * Função para apagar usuário pelo seu ID
   * @param {string} userId - ID do usuário para deletar
   */
  async function deleteUsers(userId) {
    try {
      // Envia DELETE para remover usuário
      await api.delete(`/usuarios/${userId}`);
      // Atualiza lista após remoção
      getUsers();
    } catch {
      // Tratar erros de exclusão se necessário
    }
  }

  return (
    <Container>
      {/* Logo no topo da página */}
      <Logo src={Trash} alt="Logo" />

{/* Exibe mensagens gerais de erro do formulário em um card destacado */}
{formErrors.length > 0 && (
  <div
    style={{
      background: '#ffe5e5',      // Fundo vermelho claro para destaque de erro
      padding: '1rem',            // Espaçamento interno
      borderRadius: '8px',        // Bordas arredondadas
      marginBottom: '1rem',       // Espaço abaixo do card
      color: '#c00',              // Cor do texto (vermelho escuro)
    }}
  >
    <strong>Verifique os campos:</strong>
    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
      {formErrors.map((msg, i) => (
        <li key={i}>{msg}</li>  // Lista cada mensagem de erro
      ))}
    </ul>
  </div>
)}


      {/* Componente do formulário reutilizável */}
      <UserForm
        onSubmit={onSubmit}                // Função chamada ao enviar com sucesso
        onError={onError}                  // Função chamada ao detectar erros
        submitLabel="Cadastrar"            // Texto do botão submit
        onNavigateBack={() => navigate('/')}  // Função para botão voltar
      />

      {/* Lista de usuários cadastrados */}
      {users.map((user) => (
        <Card key={user.id}>
          <CardInfo>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Empresa: {user.empresa}</p>
            {/* Botão para apagar usuário da lista */}
            <CardButton onClick={() => deleteUsers(user.id)}>Apagar</CardButton>
          </CardInfo>
        </Card>
      ))}
    </Container>
  );
}

export default Cadastro;
