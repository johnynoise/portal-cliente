import React from 'react';
import {
  Container,
  Header,
  Title,
  LogoutButton,
  Content,
  Card,
  CardTitle,
  CardText
} from './Home.styles';

function Home() {
  const user = { name: 'Johny' };

  // Exemplo de cards de info (pode alterar conforme sua necessidade)
  const cards = [
    { id: 1, title: 'Bem-vindo', text: `Olá, ${user.name}!` },
    { id: 2, title: 'Status da Conta', text: 'Sua conta está ativa.' },
    { id: 3, title: 'Suporte', text: 'Precisa de ajuda? Contate nosso suporte.' }
  ];

  const handleLogout = () => {
    // aqui vai a lógica de logout
    alert('Logout realizado!');
    // Redirecionar para a página de login
    window.location.href = '/logout';
  };

  return (
    <Container>
      <Header>
        <Title>Portal do Cliente</Title>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Header>

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
