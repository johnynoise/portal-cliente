import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiEye, FiFileText, FiAward, FiCalendar, FiUsers, FiPackage 
} from 'react-icons/fi';
import api from '../../../services/api';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';

import {
  Container, Header, Title, TopBar, SearchAndFilters, SearchBox, SearchInput, FilterButton, AddButton,
  ProductsGrid, ProductCard, ProductHeader, ProductBadge, ProductTitle, ProductDescription,
  ProductMeta, MetaItem, ProductLinks, LinkItem, ActionButtons, ActionButton, EmptyState, LoadingSpinner,
  StatsBar, StatCard, StatValue, StatLabel, FilterDropdown, FilterOption, Tooltip, TooltipText,
  ExportButton, SkeletonCard, SkeletonElement, ProductImage, StatusBadgeProduct
} from './AdminProdutos.styles';

function AdminGerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [sortField, setSortField] = useState('nome');
  const [sortDirection, setSortDirection] = useState('asc');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  // Ordenação
  const sortedProdutos = useMemo(() => {
    return [...filteredProdutos].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue?.toLowerCase() || '';
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredProdutos, sortField, sortDirection]);

  // Deletar produto com confirmação
  const handleDeleteProduct = (produto) => {
    setConfirmAction({
      type: 'delete',
      produto,
      message: `Tem certeza que deseja excluir o produto "${produto.nome}"?`,
      onConfirm: () => deletarProduto(produto.id)
    });
    setShowConfirm(true);
  };

  const deletarProduto = async (id) => {
    const loadingKey = `delete-${id}`;
    setActionLoading(prev => ({ ...prev, [loadingKey]: true }));

    try {
      await api.delete(`/produtos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Produto excluído com sucesso!');
      setProdutos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erro ao excluir produto');
    } finally {
      setActionLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  // Exportar CSV
  const handleExportCSV = useCallback(() => {
    const csvData = sortedProdutos.map(produto => ({
      Nome: produto.nome,
      Descrição: produto.descricao,
      Status: getStatusLabel(produto.status),
      Versão: produto.versao || '-',
      'Total Clientes': produto.totalClientes || 0,
      'Link Documentação': produto.linkDocumentacao || '',
      'Link Certificação': produto.linkCertificacao || ''
    }));

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).map(val => `"${val}"`).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `produtos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Exportação concluída com sucesso!');
  }, [sortedProdutos]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo': return '✓';
      case 'desenvolvimento': return '⚙️';
      case 'descontinuado': return '⊗';
      default: return '○';
    }
  };

  // Estatísticas
  const totalProdutos = produtos.length;
  const produtosAtivos = produtos.filter(p => p.status === 'ativo').length;
  const totalClientes = produtos.reduce((acc, p) => acc + (p.totalClientes || 0), 0);

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Gerenciamento de Produtos</Title>
          <p>Gerencie os produtos disponíveis no portal do cliente</p>
        </Header>
        <ProductsGrid>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonCard key={i}>
              <SkeletonElement height="180px" marginBottom="1rem" />
              <SkeletonElement height="24px" width="60%" marginBottom="0.5rem" />
              <SkeletonElement height="20px" width="40%" marginBottom="1rem" />
              <SkeletonElement height="60px" marginBottom="1rem" />
              <SkeletonElement height="20px" width="80%" />
            </SkeletonCard>
          ))}
        </ProductsGrid>
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
              placeholder="🔍 Buscar produtos..."
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
                Todos os Status
              </FilterOption>
              <FilterOption active={filterStatus === 'ativo'} onClick={() => setFilterStatus('ativo')}>
                ✓ Ativos
              </FilterOption>
              <FilterOption active={filterStatus === 'desenvolvimento'} onClick={() => setFilterStatus('desenvolvimento')}>
                ⚙️ Em Desenvolvimento
              </FilterOption>
              <FilterOption active={filterStatus === 'descontinuado'} onClick={() => setFilterStatus('descontinuado')}>
                ⊗ Descontinuados
              </FilterOption>
            </FilterDropdown>
          )}
        </SearchAndFilters>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <ExportButton onClick={handleExportCSV} disabled={sortedProdutos.length === 0}>
            📊 Exportar CSV
          </ExportButton>
          <AddButton onClick={() => navigate('/admin/produtos/criar')}>
            <FiPlus />
            Adicionar Produto
          </AddButton>
        </div>
      </TopBar>

      <ProductsGrid>
        {filteredProdutos.length === 0 ? (
          <EmptyState>
            <FiFileText size={48} />
            <h3>🔍 Nenhum produto encontrado</h3>
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
          sortedProdutos.map((produto) => (
            <ProductCard key={produto.id}>
              <ProductImage hasImage={!!produto.imagemUrl}>
                {produto.imagemUrl ? (
                  <img src={produto.imagemUrl} alt={produto.nome} />
                ) : (
                  <div className="placeholder">
                    <FiPackage />
                  </div>
                )}
              </ProductImage>

              <ProductHeader>
                <div>
                  <StatusBadgeProduct color={getStatusColor(produto.status)}>
                    {getStatusIcon(produto.status)} {getStatusLabel(produto.status)}
                  </StatusBadgeProduct>
                  <ProductTitle>{produto.nome}</ProductTitle>
                </div>
                <ActionButtons>
                  <Tooltip>
                    <ActionButton title="Visualizar" onClick={() => navigate(`/produtos/${produto.id}`)}>
                      <FiEye />
                    </ActionButton>
                    <TooltipText className="tooltip-text">Visualizar produto</TooltipText>
                  </Tooltip>
                  <Tooltip>
                    <ActionButton title="Editar" onClick={() => navigate(`/admin/produtos/editar/${produto.id}`)}>
                      <FiEdit />
                    </ActionButton>
                    <TooltipText className="tooltip-text">Editar produto</TooltipText>
                  </Tooltip>
                  <Tooltip>
                    <ActionButton 
                      title="Excluir" 
                      variant="danger" 
                      onClick={() => handleDeleteProduct(produto)}
                      disabled={actionLoading[`delete-${produto.id}`]}
                    >
                      <FiTrash2 />
                    </ActionButton>
                    <TooltipText className="tooltip-text">Excluir produto</TooltipText>
                  </Tooltip>
                </ActionButtons>
              </ProductHeader>

              <ProductDescription>{produto.descricao}</ProductDescription>

              <ProductMeta>
                <MetaItem>
                  <FiCalendar size={16} />
                  <span>v{produto.versao || '1.0.0'}</span>
                </MetaItem>
                <MetaItem>
                  <FiUsers size={16} />
                  <span>{produto.totalClientes || 0} clientes</span>
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

      {/* Dialog de Confirmação */}
      {showConfirm && confirmAction && (
        <ConfirmDialog
          title={confirmAction.type === 'delete' ? '⚠️ Excluir Produto' : 'Confirmação'}
          message={confirmAction.message}
          type="danger"
          confirmText="Sim, excluir"
          cancelText="Cancelar"
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

export default AdminGerenciarProdutos;
