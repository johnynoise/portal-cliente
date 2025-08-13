import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Container, 
  MainContent, 
  Header, 
  Title, 
  Subtitle, 
  StatsGrid, 
  StatCard, 
  StatHeader, 
  StatLabel, 
  StatValue, 
  StatIcon, 
  StatTrend, 
  ContentGrid, 
  MainActions, 
  Grid, 
  Card, 
  CardIcon, 
  CardFooter, 
  CardArrow, 
  Sidebar, 
  SidebarSection, 
  NotificationList, 
  NotificationItem, 
  ActivityList, 
  ActivityItem, 
  EmptyState, 
  NotificationBadge 
} from './AdminDashboard.styles';
import api from '../../../services/api';
import { BarChart3, Users, Package, FileText, Bell, Settings, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalProducts: 89,
    pendingReports: 12,
    activeUsers: 324
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Novo usuário registrado', time: '2 min atrás' },
    { id: 2, type: 'warning', message: 'Produto com estoque baixo', time: '15 min atrás' },
    { id: 3, type: 'success', message: 'Relatório mensal gerado', time: '1 hora atrás' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Usuário João Silva fez login', time: '5 min atrás' },
    { id: 2, action: 'Produto "Widget Pro" foi atualizado', time: '12 min atrás' },
    { id: 3, action: 'Relatório de vendas foi exportado', time: '25 min atrás' },
    { id: 4, action: 'Novo feedback recebido', time: '1 hora atrás' }
  ]);

  const opcoesAdmin = [
    {
      titulo: 'Gerenciar Usuários',
      descricao: 'Visualize, adicione ou edite os usuários do sistema',
      rota: '/admin/usuarios',
      icon: Users,
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      stats: stats.totalUsers
    },
    {
      titulo: 'Gerenciar Produtos',
      descricao: 'Adicione ou edite os produtos oferecidos',
      rota: '/admin/produtos',
      icon: Package,
      gradient: 'linear-gradient(135deg, #16a34a, #15803d)',
      stats: stats.totalProducts
    },
    {
      titulo: 'Relatórios',
      descricao: 'Acompanhe relatórios e estatísticas',
      rota: '/admin/relatorios',
      icon: BarChart3,
      gradient: 'linear-gradient(135deg, #9333ea, #7c3aed)',
      stats: stats.pendingReports
    },
    {
      titulo: 'Configurações',
      descricao: 'Configure parâmetros do sistema',
      rota: '/admin/configuracoes',
      icon: Settings,
      gradient: 'linear-gradient(135deg, #6b7280, #4b5563)',
      stats: 'Sistema'
    }
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        await api.get('/admin');
        // Aqui você pode carregar estatísticas reais da sua API
        // const statsResponse = await api.get('/admin/stats');
        // setStats(statsResponse.data);
      } catch (error) {
        if (!error.response || (error.response.status !== 401 && error.response.status !== 403)) {
          toast.error(error.message || 'Erro ao validar acesso do administrador.');
        }
      }
    };

    fetchAdminData();
  }, []);

  const handleCardClick = (rota) => {
    navigate(rota);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle style={{ width: '16px', height: '16px', color: '#16a34a' }} />;
      case 'warning':
        return <AlertCircle style={{ width: '16px', height: '16px', color: '#d97706' }} />;
      default:
        return <Clock style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Container>
      <MainContent>
        {/* Header */}
        <Header>
          <div>
            <Title>Painel do Administrador</Title>
            <Subtitle>Gerencie seu portal de clientes e produtos</Subtitle>
          </div>
          <NotificationBadge>
            <Bell style={{ width: '24px', height: '24px', color: '#64748b' }} />
          </NotificationBadge>
        </Header>

        {/* Stats Cards */}
        <StatsGrid>
          <StatCard>
            <StatHeader>
              <div>
                <StatLabel>Total de Usuários</StatLabel>
                <StatValue>{stats.totalUsers}</StatValue>
              </div>
              <StatIcon className="users">
                <Users style={{ width: '24px', height: '24px' }} />
              </StatIcon>
            </StatHeader>
            <StatTrend className="positive">
              <TrendingUp style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              +12% este mês
            </StatTrend>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatLabel>Produtos Ativos</StatLabel>
                <StatValue>{stats.totalProducts}</StatValue>
              </div>
              <StatIcon className="products">
                <Package style={{ width: '24px', height: '24px' }} />
              </StatIcon>
            </StatHeader>
            <StatTrend className="positive">
              <TrendingUp style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              +5 novos
            </StatTrend>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatLabel>Usuários Online</StatLabel>
                <StatValue>{stats.activeUsers}</StatValue>
              </div>
              <StatIcon className="trending">
                <TrendingUp style={{ width: '24px', height: '24px' }} />
              </StatIcon>
            </StatHeader>
            <StatTrend className="positive">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', marginRight: '4px' }}></div>
              Ativos agora
            </StatTrend>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatLabel>Relatórios Pendentes</StatLabel>
                <StatValue>{stats.pendingReports}</StatValue>
              </div>
              <StatIcon className="reports">
                <FileText style={{ width: '24px', height: '24px' }} />
              </StatIcon>
            </StatHeader>
            <StatTrend className="neutral">
              <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              Requer atenção
            </StatTrend>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          {/* Main Actions */}
          <MainActions>
            <h2>Ações Principais</h2>
            <Grid>
              {opcoesAdmin.map((opcao, index) => {
                const Icon = opcao.icon;
                return (
                  <Card 
                    key={index} 
                    onClick={() => handleCardClick(opcao.rota)}
                    gradient={opcao.gradient}
                  >
                    <CardIcon gradient={opcao.gradient}>
                      <Icon />
                    </CardIcon>
                    <h3>{opcao.titulo}</h3>
                    <p>{opcao.descricao}</p>
                    <CardFooter>
                      <span>
                        {typeof opcao.stats === 'number' ? `${opcao.stats} itens` : opcao.stats}
                      </span>
                      <CardArrow>
                        <span>→</span>
                      </CardArrow>
                    </CardFooter>
                  </Card>
                );
              })}
            </Grid>
          </MainActions>

          {/* Sidebar */}
          <Sidebar>
            {/* Notifications */}
            <SidebarSection>
              <h3>
                <Bell />
                Notificações
              </h3>
              <NotificationList>
                {notifications.length === 0 ? (
                  <EmptyState>
                    <p>Nenhuma notificação</p>
                  </EmptyState>
                ) : (
                  notifications.map((notification) => (
                    <NotificationItem key={notification.id}>
                      <div className="icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="content">
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                      <div 
                        className="dismiss"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        ×
                      </div>
                    </NotificationItem>
                  ))
                )}
              </NotificationList>
            </SidebarSection>

            {/* Recent Activity */}
            <SidebarSection>
              <h3>Atividade Recente</h3>
              <ActivityList>
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id}>
                    <div className="dot"></div>
                    <div className="content">
                      <p>{activity.action}</p>
                      <span>{activity.time}</span>
                    </div>
                  </ActivityItem>
                ))}
              </ActivityList>
            </SidebarSection>
          </Sidebar>
        </ContentGrid>
      </MainContent>
    </Container>
  );
}

export default AdminDashboard;