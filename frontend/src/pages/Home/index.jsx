import React, { useState } from 'react';
import Trash from '../../assets/wasion.svg';
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
} from './Home.styles';

function Home() {
  const [count, setCount] = useState(0);
  const users = [
    {
      id: 1,
      nome: 'João',
      email: 'joao@gmail.com',
      empresa: 'Empresa A'
    },
    {
      id: 2,
      nome: 'Johny',
      email: 'johny@gmail.com',
      empresa: 'Empresa B'
    }
  ];

  return (
    <Container>
      <Logo src={Trash} alt="Logo" />
      <Form>
        <Title>Cadastro de Usuários</Title>
        <Input name='nome' placeholder='Nome Completo' type='text' />
        <Input name='email' placeholder='Email Válido' type='email' />
        <Input name='empresa' placeholder='Empresa' type='text' />
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
        <Button type='button'>Cadastrar</Button>
      </Form>
      {/*  
      {users.map(user => (
        <Card key={user.id}>
          <CardInfo>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
            <p>Empresa: {user.empresa}</p>
          </CardInfo>
          <CardButton>Apagar</CardButton>
        </Card>
      ))}
        */}
    </Container>
  );
}

export default Home;
