import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicione este import
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
  PasswordRules
} from './Cadastro.styles';
import { SecondaryButton } from '../Login/Login.styles';

function Cadastro() {
  const [users, setUsers] = useState([]);
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputEmpresa = useRef(null);
  const navigate = useNavigate(); // Adicione esta linha

  async function getUsers() {
    const response = await api.get('/usuarios');
    setUsers(response.data);
  }

    async function createUsers() {
    const newUser = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      empresa: inputEmpresa.current.value
    };
    await api.post('/usuarios', newUser);
    getUsers(); // Refresh the user list after adding a new user
    console.log('User created successfully!');
  }

     async function deleteUsers() {
    const userId = users[0].id; // Assuming you want to delete the first user for demonstration
    await api.delete(`/usuarios/${userId}`);
    getUsers(); // Refresh the user list after deletion
     }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Logo src={Trash} alt="Logo" />
      <Form>
        <Title>Cadastro de Usuários</Title>
        <Input name='nome' placeholder='Nome Completo' type='text' ref={inputName}/>
        <Input name='email' placeholder='Email Válido' type='email' ref={inputEmail} />
        <Input name='empresa' placeholder='Empresa' type='text' ref={inputEmpresa}/>
        <Input name='telefone' placeholder='(xx) xxxxx-xxxx' type='tel' />
        <Input name='nome' placeholder='Senha' type='password' />
        <PasswordRules>
          • Mínimo 8 caracteres<br />
          • Pelo menos uma letra maiúscula<br />
          • Pelo menos um número<br />
          • Um caractere especial (!@#$%)
        </PasswordRules>
        <Input name='nome' placeholder='Confirme a Senha' type='password' />
        <text></text>
        <Button type='button' onClick={createUsers}>Cadastrar</Button>
        <SecondaryButton type='button' onClick={() => navigate('/')}>Voltar para Login</SecondaryButton> {/* Botão de voltar */}
      </Form>
      
      {users.map(user => (
        <Card key={user.id}>
          <CardInfo>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Empresa: {user.empresa}</p>
          </CardInfo>
          <CardButton onClick={deleteUsers}>Apagar</CardButton>
        </Card>
      ))}
        
    </Container>
  );
}

export default Cadastro;
