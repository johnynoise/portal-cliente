import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/wasion.svg';

import {
  Container,
  Navbar,
  LogoWrapper,
  Logo,
  Title,
  LogoutButton,
  Content,
  Card,
  CardTitle,
  CardText
} from './Home.styles';

function Home() {
  const navigate = useNavigate();
  const user = { name: 'Johny' };

  const cards = [
    { id: 1, title: 'Bem-vindo', text: `Olá, ${user.name}!` },
    { id: 2, title: 'Status da Conta', text: 'Sua conta está ativa.' },
    { id: 3, title: 'Suporte', text: 'Precisa de ajuda? Contate nosso suporte.' }
  ];

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Container>
      <Navbar>
        <LogoWrapper>
          <Logo src={LogoImage} alt="Logo da Aplicação" />
        </LogoWrapper>
        <Title>Portal do Cliente</Title>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Navbar>

      <Content>
        {cards.map(card => (
          <Card key={card.id}>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.text}</CardText>
          </Card>
        ))}
      </Content>
    </Container>
  );
}

export default Home;
