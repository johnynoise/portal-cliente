// src/pages/AdminDashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Container, MainContent, Header, Title, Subtitle,
  StatsGrid, StatCard, StatHeader, StatLabel, StatValue,
  StatIcon, StatTrend, ContentGrid, MainActions, Grid, Card,
  CardIcon, CardFooter, CardArrow, Sidebar, SidebarSection,
  NotificationList, NotificationItem, EmptyState, NotificationBadge
} from './AdminDashboard.styles';
import api from '../../../services/api';
import { BarChart3, Users, Package, FileText, Bell, CheckCircle, AlertCircle, Clock, CircleAlertIcon, CircleHelp } from 'lucide-react';
import { fa } from 'zod/v4/locales';
import LoadingSpinner from '../../../components/TelaLoading/Loading';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingReports: 0,
    totalFaq: 0,
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const opcoesAdmin = [
    { titulo: 'Gerenciar Usuários', descricao: 'Visualize, adicione ou edite os usuários do sistema', rota: '/admin/usuarios', icon: Users, gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', stats: stats.totalUsers },
    { titulo: 'Gerenciar Produtos', descricao: 'Adicione ou edite os produtos oferecidos', rota: '/admin/produtos', icon: Package, gradient: 'linear-gradient(135deg, #16a34a, #15803d)', stats: stats.totalProducts },
    { titulo: 'Gerenciar FAQs', descricao: 'Gerencie o FAQ do seu site', rota: '/admin/faq', icon: CircleHelp, gradient: 'linear-gradient(135deg, #9333ea, #7c3aed)', stats: stats.totalFaq },
    { titulo: 'Relatórios', descricao: 'Acompanhe relatórios e estatísticas', rota: '/admin/relatorios', icon: BarChart3, gradient: 'linear-gradient(135deg, #9333ea, #7c3aed)', stats: stats.pendingReports }
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Buscar usuários
        const usersResponse = await api.get('/admin/usuarios');
        const totalUsers = usersResponse.data.length;

        // Buscar produtos
        const productsResponse = await api.get('/produtos');
        const totalProducts = productsResponse.data.length;

        // Buscar FAQs
        const faqsResponse = await api.get('/faq');
        const totalFaq = faqsResponse.data.length;

        // Exemplo de pendentes (substituir pelo endpoint real)
        const pendingReports = 5;

        setStats({ totalUsers, totalProducts, totalFaq, pendingReports });

        // Exemplo de notificações
        setNotifications([
          { id: 1, type: 'info', message: 'Novo usuário registrado', time: '2 min atrás' },
          { id: 2, type: 'warning', message: 'Produto com estoque baixo', time: '15 min atrás' }
        ]);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || 'Erro ao carregar dados do administrador.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleCardClick = (rota) => navigate(rota);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle style={{ width: 16, height: 16, color: '#16a34a' }} />;
      case 'warning': return <AlertCircle style={{ width: 16, height: 16, color: '#d97706' }} />;
      default: return <Clock style={{ width: 16, height: 16, color: '#3b82f6' }} />;
    }
  };

  const dismissNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));

if (loading) return <LoadingSpinner />; // Troque o retorno do loading


  return (
    <Container>
      <MainContent>
        <Header>
          <div>
            <Title>Painel do Administrador</Title>
            <Subtitle>Gerencie seu portal de clientes e produtos</Subtitle>
          </div>
          <NotificationBadge>
            <Bell style={{ width: 24, height: 24, color: '#64748b' }} />
          </NotificationBadge>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatHeader>
              <div>
                <StatLabel>Total de Usuários</StatLabel>
                <StatValue>{stats.totalUsers}</StatValue>
              </div>
            </StatHeader>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatLabel>Produtos Ativos</StatLabel>
                <StatValue>{stats.totalProducts}</StatValue>
              </div>
            </StatHeader>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                
                <StatLabel>Relatórios Pendentes</StatLabel>
                
                <StatValue>{stats.pendingReports}</StatValue>
              </div>
            </StatHeader>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <MainActions>
            <h2>Ações Principais</h2>
            <Grid>
              {opcoesAdmin.map((opcao, index) => {
                const Icon = opcao.icon;
                return (
                  <Card key={index} onClick={() => handleCardClick(opcao.rota)} gradient={opcao.gradient}>
                    <CardIcon gradient={opcao.gradient}><Icon /></CardIcon>
                    <h3>{opcao.titulo}</h3>
                    <p>{opcao.descricao}</p>
                    <CardFooter>
                      <span>{`${opcao.stats} itens`}</span>
                      <CardArrow><span>→</span></CardArrow>
                    </CardFooter>
                  </Card>
                );
              })}
            </Grid>
          </MainActions>

          <Sidebar>
            <SidebarSection>
              <h3><Bell /> Notificações</h3>
              <NotificationList>
                {notifications.length === 0 ? <EmptyState><p>Nenhuma notificação</p></EmptyState> : notifications.map(n => (
                  <NotificationItem key={n.id}>
                    <div className="icon">{getNotificationIcon(n.type)}</div>
                    <div className="content"><p>{n.message}</p><span>{n.time}</span></div>
                    <div className="dismiss" onClick={() => dismissNotification(n.id)}>×</div>
                  </NotificationItem>
                ))}
              </NotificationList>
            </SidebarSection>
          </Sidebar>
        </ContentGrid>
      </MainContent>
    </Container>
  );
}

export default AdminDashboard;
