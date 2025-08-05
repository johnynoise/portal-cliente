import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Title, Grid, Card } from './AdminDashboard.styles';
import api from '../../../services/api';

function AdminDashboard() {
  const navigate = useNavigate();

  const opcoesAdmin = [
    {
      titulo: 'Gerenciar Usuários',
      descricao: 'Visualize, adicione ou edite os usuários do sistema.',
      rota: '/admin/usuarios'
    },
    {
      titulo: 'Gerenciar Produtos',
      descricao: 'Adicione ou edite os produtos oferecidos.',
      rota: '/admin/produtos'
    },
    {
      titulo: 'Relatórios',
      descricao: 'Acompanhe relatórios e estatísticas.',
      rota: '/admin/relatorios'
    }
  ];

useEffect(() => {
  const fetchAdminData = async () => {
    try {
      await api.get('/admin');
    } catch (error) {
      if (!error.response || (error.response.status !== 401 && error.response.status !== 403)) {
        toast.error(error.message || 'Erro ao validar acesso do administrador.');
      }
    }
  };

  fetchAdminData();
}, []);


  return (
    <Container>
      <Title>Painel do Administrador</Title>
      <Grid>
        {opcoesAdmin.map((opcao, index) => (
          <Card key={index} onClick={() => navigate(opcao.rota)}>
            <h3>{opcao.titulo}</h3>
            <p>{opcao.descricao}</p>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
