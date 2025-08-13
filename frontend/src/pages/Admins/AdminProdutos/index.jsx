import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiEye, FiFileText, FiAward, FiCalendar, FiUsers } from 'react-icons/fi';

import {
  Container,
  Header,
  Title,
  TopBar,
  SearchAndFilters,
  SearchBox,
  SearchInput,
  FilterButton,
  AddButton,
  ProductsGrid,
  ProductCard,
  ProductHeader,
  ProductBadge,
  ProductTitle,
  ProductDescription,
  ProductMeta,
  MetaItem,
  ProductLinks,
  LinkItem,
  ActionButtons,
  ActionButton,
  EmptyState,
  LoadingSpinner,
  StatsBar,
  StatCard,
  StatValue,
  StatLabel,
  FilterDropdown,
  FilterOption
} from './AdminProdutos.styles';

function AdminGerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Mock data para demonstração - substitua pela sua API
  const mockProdutos = [
    {
      id: 1,
      nome: "Sistema de Gestão ERP",
      descricao: "Sistema completo de gestão empresarial com módulos financeiro, RH e vendas",
      linkDocumentacao: "https://docs.exemplo.com/erp",
      linkCertificacao: "https://cert.exemplo.com/erp",
      status: "ativo",
      versao: "2.1.4",
      dataUltimaAtualizacao: "2024-01-15",
      totalClientes: 245
    },
    {
      id: 2,
      nome: "API Gateway Premium",
      descricao: "Solução robusta para gerenciamento de APIs com alta disponibilidade",
      linkDocumentacao: "https://docs.exemplo.com/gateway",
      linkCertificacao: "https://cert.exemplo.com/gateway",
      status: "ativo",
      versao: "1.8.2",
      dataUltimaAtualizacao: "2024-01-10",
      totalClientes: 156
    },
    {
      id: 3,
      nome: "Analytics Dashboard",
      descricao: "Plataforma de analytics em tempo real com visualizações interativas",
      linkDocumentacao: "https://docs.exemplo.com/analytics",
      linkCertificacao: null,
      status: "desenvolvimento",
      versao: "0.9.1-beta",
      dataUltimaAtualizacao: "2024-01-12",
      totalClientes: 32
    }
  ];

  useEffect(() => {
    fetchProdutos();
  }, []);

  useEffect(() => {
    filterProdutos();
  }, [produtos, searchTerm, filterStatus]);

  async function fetchProdutos() {
    setLoading(true);
    try {
      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Substitua por sua chamada real da API
      // const res = await fetch('http://localhost:3000/produtos', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // if (!res.ok) throw new Error('Erro ao carregar produtos');
      // const data = await res.json();
      
      setProdutos(mockProdutos);
    } catch (err) {
      toast.error(err.message || 'Erro ao carregar produtos');
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  }

  function filterProdutos() {
    let filtered = produtos;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (filterStatus !== 'todos') {
      filtered = filtered.filter(produto => produto.status === filterStatus);
    }

    setFilteredProdutos(filtered);
  }

  async function deletarProduto(id) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      // const res = await fetch(`http://localhost:3000/produtos/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // if (!res.ok) throw new Error('Erro ao excluir produto');

      toast.success('Produto excluído com sucesso!');
      setProdutos(produtos.filter(p => p.id !== id));
    } catch (err) {
      toast.error(err.message || 'Erro ao excluir produto');
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'ativo': return '#28a745';
      case 'desenvolvimento': return '#ffc107';
      case 'descontinuado': return '#dc3545';
      default: return '#6c757d';
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'desenvolvimento': return 'Em Desenvolvimento';
      case 'descontinuado': return 'Descontinuado';
      default: return 'Indefinido';
    }
  }

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
          
          <FilterButton 
            active={showFilters} 
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            Filtros
          </FilterButton>
          
          {showFilters && (
            <FilterDropdown>
              <FilterOption 
                active={filterStatus === 'todos'}
                onClick={() => setFilterStatus('todos')}
              >
                Todos
              </FilterOption>
              <FilterOption 
                active={filterStatus === 'ativo'}
                onClick={() => setFilterStatus('ativo')}
              >
                Ativos
              </FilterOption>
              <FilterOption 
                active={filterStatus === 'desenvolvimento'}
                onClick={() => setFilterStatus('desenvolvimento')}
              >
                Em Desenvolvimento
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
                  <ActionButton 
                    title="Visualizar"
                    onClick={() => navigate(`/admin/produtos/${produto.id}`)}
                  >
                    <FiEye />
                  </ActionButton>
                  <ActionButton 
                    title="Editar"
                    onClick={() => navigate(`/admin/produtos/editar/${produto.id}`)}
                  >
                    <FiEdit />
                  </ActionButton>
                  <ActionButton 
                    title="Excluir"
                    variant="danger"
                    onClick={() => deletarProduto(produto.id)}
                  >
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
                  <LinkItem 
                    href={produto.linkDocumentacao} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiFileText size={16} />
                    Documentação
                  </LinkItem>
                )}
                {produto.linkCertificacao && (
                  <LinkItem 
                    href={produto.linkCertificacao} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
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