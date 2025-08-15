import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiEye, FiFileText, FiAward, FiCalendar, FiUsers 
} from 'react-icons/fi';
import api from '../../../services/api';

import {
  Container, Header, Title, TopBar, SearchAndFilters, SearchBox, SearchInput, FilterButton, AddButton,
  ProductsGrid, ProductCard, ProductHeader, ProductBadge, ProductTitle, ProductDescription,
  ProductMeta, MetaItem, ProductLinks, LinkItem, ActionButtons, ActionButton, EmptyState, LoadingSpinner,
  StatsBar, StatCard, StatValue, StatLabel, FilterDropdown, FilterOption
} from './AdminProdutos.styles';

function AdminGerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch produtos da API
  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/produtos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erro ao carregar produtos');
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Filtro e busca otimizados
  const filteredProdutos = useMemo(() => {
    return produtos.filter(produto => {
      const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            produto.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'todos' || produto.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [produtos, searchTerm, filterStatus]);

  // Deletar produto
  const deletarProduto = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await api.delete(`/produtos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Produto excluído com sucesso!');
      setProdutos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erro ao excluir produto');
    }
  };

  // Helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return '#28a745';
      case 'desenvolvimento': return '#ffc107';
      case 'descontinuado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'desenvolvimento': return 'Em Desenvolvimento';
      case 'descontinuado': return 'Descontinuado';
      default: return 'Indefinido';
    }
  };

  // Estatísticas
  const totalProdutos = produtos.length;
  const produtosAtivos = produtos.filter(p => p.status === 'ativo').length;
  const totalClientes = produtos.reduce((acc, p) => acc + (p.totalClientes || 0), 0);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Carregando produtos...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Gerenciamento de Produtos</Title>
        <p>Gerencie os produtos disponíveis no portal do cliente</p>
      </Header>

      <StatsBar>
        <StatCard>
          <StatValue>{totalProdutos}</StatValue>
          <StatLabel>Total de Produtos</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{produtosAtivos}</StatValue>
          <StatLabel>Produtos Ativos</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalClientes}</StatValue>
          <StatLabel>Total de Clientes</StatLabel>
        </StatCard>
      </StatsBar>

      <TopBar>
        <SearchAndFilters>
          <SearchBox>
            <FiSearch />
            <SearchInput
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <FilterButton active={showFilters} onClick={() => setShowFilters(!showFilters)}>
            <FiFilter />
            Filtros
          </FilterButton>

          {showFilters && (
            <FilterDropdown>
              <FilterOption active={filterStatus === 'todos'} onClick={() => setFilterStatus('todos')}>
                Todos
              </FilterOption>
              <FilterOption active={filterStatus === 'ativo'} onClick={() => setFilterStatus('ativo')}>
                Ativos
              </FilterOption>
              <FilterOption active={filterStatus === 'desenvolvimento'} onClick={() => setFilterStatus('desenvolvimento')}>
                Em Desenvolvimento
              </FilterOption>
              <FilterOption active={filterStatus === 'descontinuado'} onClick={() => setFilterStatus('descontinuado')}>
                Descontinuados
              </FilterOption>
            </FilterDropdown>
          )}
        </SearchAndFilters>

        <AddButton onClick={() => navigate('/admin/produtos/criar')}>
          <FiPlus />
          Adicionar Produto
        </AddButton>
      </TopBar>

      <ProductsGrid>
        {filteredProdutos.length === 0 ? (
          <EmptyState>
            <FiFileText size={48} />
            <h3>Nenhum produto encontrado</h3>
            <p>
              {searchTerm || filterStatus !== 'todos'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando seu primeiro produto'}
            </p>
            {!searchTerm && filterStatus === 'todos' && (
              <AddButton onClick={() => navigate('/admin/produtos/criar')}>
                <FiPlus />
                Adicionar Primeiro Produto
              </AddButton>
            )}
          </EmptyState>
        ) : (
          filteredProdutos.map((produto) => (
            <ProductCard key={produto.id}>
              <ProductHeader>
                <div>
                  <ProductBadge color={getStatusColor(produto.status)}>
                    {getStatusLabel(produto.status)}
                  </ProductBadge>
                  <ProductTitle>{produto.nome}</ProductTitle>
                </div>
                <ActionButtons>
                  <ActionButton title="Visualizar" onClick={() => navigate(`/produtos/${produto.id}`)}>
                    <FiEye />
                  </ActionButton>
                  <ActionButton title="Editar" onClick={() => navigate(`/admin/produtos/editar/${produto.id}`)}>
                    <FiEdit />
                  </ActionButton>
                  <ActionButton title="Excluir" variant="danger" onClick={() => deletarProduto(produto.id)}>
                    <FiTrash2 />
                  </ActionButton>
                </ActionButtons>
              </ProductHeader>

              <ProductDescription>{produto.descricao}</ProductDescription>

              <ProductMeta>
                <MetaItem>
                  <FiCalendar size={16} />
                  <span>v{produto.versao}</span>
                </MetaItem>
                <MetaItem>
                  <FiUsers size={16} />
                  <span>{produto.totalClientes} clientes</span>
                </MetaItem>
              </ProductMeta>

              <ProductLinks>
                {produto.linkDocumentacao && (
                  <LinkItem href={produto.linkDocumentacao} target="_blank" rel="noopener noreferrer">
                    <FiFileText size={16} />
                    Documentação
                  </LinkItem>
                )}
                {produto.linkCertificacao && (
                  <LinkItem href={produto.linkCertificacao} target="_blank" rel="noopener noreferrer">
                    <FiAward size={16} />
                    Certificação
                  </LinkItem>
                )}
              </ProductLinks>
            </ProductCard>
          ))
        )}
      </ProductsGrid>
    </Container>
  );
}

export default AdminGerenciarProdutos;
