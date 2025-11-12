import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Loading from '../../../components/TelaLoading/Loading';
import UserModal from '../../../components/UserModal/UserModal';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';

import {
  Container,
  Header,
  Title,
  SearchAndFilters,
  SearchInput,
  FilterSelect,
  AddButton,
  TableContainer,
  UsersTable,
  TableRow,
  TableHeader,
  TableCell,
  ActionButton,
  ActionButtons,
  StatusBadge,
  EmptyState,
  Pagination,
  PageButton,
  UserCard,
  MobileContainer,
  StatsCards,
  StatCard,
  StatNumber,
  StatLabel,
  SortIcon,
  BulkActions,
  Checkbox
} from './AdminUsuarios.styles';

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    try {
      const res = await api.get('/admin/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }

  // Filtros e busca
  const filteredUsers = useMemo(() => {
    return usuarios.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.empresa?.toLowerCase().includes(searchTerm.toLowerCase());
      
  const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [usuarios, searchTerm, filterRole, filterStatus]);

  // Ordenação
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredUsers, sortField, sortDirection]);

  // Paginação
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Estatísticas
  const stats = useMemo(() => {
    const total = usuarios.length;
    const active = usuarios.filter(u => (u.status || 'active') === 'active').length;
    const inactive = usuarios.filter(u => u.status === 'inactive').length;
    const admins = usuarios.filter(u => u.role === 'admin').length;
    
    return { total, active, inactive, admins };
  }, [usuarios]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(currentUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (user) => {
    setConfirmAction({
      type: 'delete',
      user,
      message: `Tem certeza que deseja excluir o usuário "${user.name}"?`,
      onConfirm: () => deleteUser(user.id)
    });
    setShowConfirm(true);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'ativar' : 'desativar';
    
    setConfirmAction({
      type: 'toggle',
      user,
      message: `Tem certeza que deseja ${action} o usuário "${user.name}"?`,
      onConfirm: () => toggleUserStatus(user.id, newStatus)
    });
    setShowConfirm(true);
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/admin/usuarios/${userId}`);
      setUsuarios(usuarios.filter(u => u.id !== userId));
      toast.success('Usuário excluído com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir usuário');
    }
  };

  const toggleUserStatus = async (userId, status) => {
    try {
      await api.patch(`/admin/usuarios/${userId}`, { status });
      setUsuarios(usuarios.map(u => 
        u.id === userId ? { ...u, status } : u
      ));
      toast.success(`Status do usuário alterado com sucesso`);
    } catch (error) {
      toast.error('Erro ao alterar status do usuário');
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    
    setConfirmAction({
      type: 'bulk-delete',
      message: `Tem certeza que deseja excluir ${selectedUsers.length} usuário(s) selecionado(s)?`,
      onConfirm: async () => {
        try {
          await Promise.all(selectedUsers.map(id => api.delete(`/admin/usuarios/${id}`)));
          setUsuarios(usuarios.filter(u => !selectedUsers.includes(u.id)));
          setSelectedUsers([]);
          toast.success('Usuários excluídos com sucesso');
        } catch (error) {
          toast.error('Erro ao excluir usuários');
        }
      }
    });
    setShowConfirm(true);
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Header>
        <Title>Gerenciamento de Usuários</Title>
        <AddButton onClick={handleAddUser}>
          + Novo Usuário
        </AddButton>
      </Header>

      <StatsCards>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total de Usuários</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.active}</StatNumber>
          <StatLabel>Usuários Ativos</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.inactive}</StatNumber>
          <StatLabel>Usuários Inativos</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.admins}</StatNumber>
          <StatLabel>Administradores</StatLabel>
        </StatCard>
      </StatsCards>

      <SearchAndFilters>
        <SearchInput
          type="text"
          placeholder="Buscar usuários por nome, email ou empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">Todas as funções</option>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente/Usuário</option>
        </FilterSelect>
        <FilterSelect
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </FilterSelect>
      </SearchAndFilters>

      {selectedUsers.length > 0 && (
        <BulkActions>
          <span>{selectedUsers.length} usuário(s) selecionado(s)</span>
          <ActionButton danger onClick={handleBulkDelete}>
            Excluir Selecionados
          </ActionButton>
        </BulkActions>
      )}

      {sortedUsers.length === 0 ? (
        <EmptyState>
          <h3>Nenhum usuário encontrado</h3>
          <p>Tente ajustar os filtros de busca ou adicione um novo usuário.</p>
        </EmptyState>
      ) : (
        <>
          {/* Desktop Table */}
          <TableContainer className="desktop-only">
            <UsersTable>
              <thead>
                <TableRow>
                  <TableHeader style={{ width: '50px' }}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHeader>
                  <TableHeader onClick={() => handleSort('name')}>
                    Nome
                    <SortIcon active={sortField === 'name'} direction={sortDirection}>
                      ↕
                    </SortIcon>
                  </TableHeader>
                  <TableHeader onClick={() => handleSort('email')}>
                    Email
                    <SortIcon active={sortField === 'email'} direction={sortDirection}>
                      ↕
                    </SortIcon>
                  </TableHeader>
                  <TableHeader onClick={() => handleSort('role')}>
                    Função
                    <SortIcon active={sortField === 'role'} direction={sortDirection}>
                      ↕
                    </SortIcon>
                  </TableHeader>
                  <TableHeader>Empresa</TableHeader>
                  <TableHeader>Telefone</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader style={{ width: '150px' }}>Ações</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {currentUsers.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <Checkbox
                        type="checkbox"
                        checked={selectedUsers.includes(usuario.id)}
                        onChange={(e) => handleSelectUser(usuario.id, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>{usuario.name}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.role}</TableCell>
                    <TableCell>{usuario.empresa || '-'}</TableCell>
                    <TableCell>{usuario.telefone || '-'}</TableCell>
                    <TableCell>
                      <StatusBadge status={usuario.status || 'active'}>
                        {usuario.status === 'active' ? 'Ativo' : 'Inativo'}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton onClick={() => handleEditUser(usuario)}>
                          Editar
                        </ActionButton>
                        <ActionButton 
                          secondary
                          onClick={() => handleToggleStatus(usuario)}
                        >
                          {usuario.status === 'active' ? 'Desativar' : 'Ativar'}
                        </ActionButton>
                        <ActionButton 
                          onClick={() => handleSendReset(usuario)}
                        >
                          Enviar Redefinição
                        </ActionButton>
                        <ActionButton 
                          danger
                          onClick={() => handleDeleteUser(usuario)}
                        >
                          Excluir
                        </ActionButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </UsersTable>
          </TableContainer>

          {/* Mobile Cards */}
          <MobileContainer className="mobile-only">
            {currentUsers.map((usuario) => (
              <UserCard key={usuario.id}>
                <div className="card-header">
                  <h4>{usuario.name}</h4>
                  <StatusBadge status={usuario.status || 'active'}>
                    {usuario.status === 'active' ? 'Ativo' : 'Inativo'}
                  </StatusBadge>
                </div>
                <div className="card-content">
                  <p><strong>Email:</strong> {usuario.email}</p>
                  <p><strong>Função:</strong> {usuario.role}</p>
                  {usuario.empresa && <p><strong>Empresa:</strong> {usuario.empresa}</p>}
                  {usuario.telefone && <p><strong>Telefone:</strong> {usuario.telefone}</p>}
                </div>
                <ActionButtons>
                  <ActionButton onClick={() => handleEditUser(usuario)}>
                    Editar
                  </ActionButton>
                  <ActionButton 
                    secondary
                    onClick={() => handleToggleStatus(usuario)}
                  >
                    {usuario.status === 'active' ? 'Desativar' : 'Ativar'}
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleSendReset(usuario)}
                  >
                    Enviar Redefinição
                  </ActionButton>
                  <ActionButton 
                    danger
                    onClick={() => handleDeleteUser(usuario)}
                  >
                    Excluir
                  </ActionButton>
                </ActionButtons>
              </UserCard>
            ))}
          </MobileContainer>

          {/* Paginação */}
          {totalPages > 1 && (
            <Pagination>
              <PageButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </PageButton>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PageButton
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ))}
              
              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Próximo
              </PageButton>
            </Pagination>
          )}
        </>
      )}

      {/* Modal de Usuário */}
      {showModal && (
        <UserModal
          user={editingUser}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            fetchUsuarios();
          }}
        />
      )}

      {/* Dialog de Confirmação */}
      {showConfirm && confirmAction && (
        <ConfirmDialog
          message={confirmAction.message}
          type={confirmAction.type === 'delete' || confirmAction.type === 'bulk-delete' ? 'danger' : 'warning'}
          onConfirm={() => {
            confirmAction.onConfirm();
            setShowConfirm(false);
            setConfirmAction(null);
          }}
          onCancel={() => {
            setShowConfirm(false);
            setConfirmAction(null);
          }}
        />
      )}
    </Container>
  );
}

// helpers
async function handleSendReset(usuario) {
  try {
    await api.post('/auth/recuperar-senha', { email: usuario.email });
    toast.success('E-mail de redefinição enviado');
  } catch (error) {
    toast.error('Erro ao enviar e-mail de redefinição');
  }
}