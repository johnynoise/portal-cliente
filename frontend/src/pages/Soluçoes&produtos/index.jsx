import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Header,
  Title,
  Subtitle,
  HeaderStats,
  StatCard,
  StatValue,
  StatLabel,
  FiltersSection,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FilterRow,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  ViewToggle,
  ViewButton,
  ActiveFiltersBar,
  FilterChip,
  ClearAllButton,
  ProductsSection,
  ProductsHeader,
  ProductCount,
  SortSelect,
  ExportButton,
  ProductsGrid,
  ProductCard,
  ProductImageContainer,
  ProductImage,
  ProductImagePlaceholder,
  BadgeContainer,
  StatusBadge,
  VersionBadge,
  ProductContent,
  ProductName,
  ProductDescription,
  ProductMeta,
  MetaItem,
  MetaIcon,
  MetaText,
  QuickStats,
  StatItem,
  ProductActions,
  ActionButton,
  PrimaryButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  SkeletonCard,
  SkeletonImage,
  SkeletonText,
  SkeletonLine
} from './solucoes.styles';

// Ícones
const Icons = {
  Home: () => '🏠',
  ChevronRight: () => '›',
  Search: () => '🔍',
  Grid: () => '⚏',
  List: () => '☰',
  Download: () => '⬇️',
  Eye: () => '👁️',
  Users: () => '👥',
  Package: () => '📦',
  Factory: () => '🏭',
  Calendar: () => '📅',
  Filter: () => '🔍',
  X: () => '✕',
  ExternalLink: () => '🔗',
  FileText: () => '📄',
  Zap: () => '⚡'
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('nome');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFabricante, setSelectedFabricante] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await api.get('/produtos');
      setProducts(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        toast.error('Erro ao carregar produtos');
      }
    } finally {
      setLoading(false);
    }
  }

  // Extrair categorias, fabricantes e status únicos
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(products.map(p => p.categoria).filter(Boolean))];
    return cats.map(cat => ({ value: cat, label: cat === 'all' ? 'Todas' : cat }));
  }, [products]);

  const fabricantes = useMemo(() => {
    const fabs = ['all', ...new Set(products.map(p => p.fabricante).filter(Boolean))];
    return fabs.map(fab => ({ value: fab, label: fab === 'all' ? 'Todos' : fab }));
  }, [products]);

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'ativo', label: 'Ativo' },
    { value: 'desenvolvimento', label: 'Desenvolvimento' },
    { value: 'descontinuado', label: 'Descontinuado' }
  ];

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.nome.toLowerCase().includes(term) ||
        (p.descricao && p.descricao.toLowerCase().includes(term)) ||
        (p.categoria && p.categoria.toLowerCase().includes(term))
      );
    }

    // Categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoria === selectedCategory);
    }

    // Status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    // Fabricante
    if (selectedFabricante !== 'all') {
      filtered = filtered.filter(p => p.fabricante === selectedFabricante);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'nome':
          return a.nome.localeCompare(b.nome);
        case 'versao':
          return (b.versao || '').localeCompare(a.versao || '');
        case 'clientes':
          return (b.totalClientes || 0) - (a.totalClientes || 0);
        case 'recente':
          return new Date(b.atualizadoEm || b.criadoEm) - new Date(a.atualizadoEm || a.criadoEm);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedStatus, selectedFabricante, sortBy]);

  // Contadores de stats
  const stats = useMemo(() => ({
    total: products.length,
    ativos: products.filter(p => p.status === 'ativo').length,
    totalClientes: products.reduce((sum, p) => sum + (p.totalClientes || 0), 0),
    categorias: new Set(products.map(p => p.categoria).filter(Boolean)).size
  }), [products]);

  // Active filters
  const activeFilters = useMemo(() => {
    const filters = [];
    if (selectedCategory !== 'all') filters.push({ type: 'categoria', value: selectedCategory });
    if (selectedStatus !== 'all') filters.push({ type: 'status', value: selectedStatus });
    if (selectedFabricante !== 'all') filters.push({ type: 'fabricante', value: selectedFabricante });
    return filters;
  }, [selectedCategory, selectedStatus, selectedFabricante]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedFabricante('all');
  };

  const removeFilter = (type) => {
    switch (type) {
      case 'categoria': setSelectedCategory('all'); break;
      case 'status': setSelectedStatus('all'); break;
      case 'fabricante': setSelectedFabricante('all'); break;
    }
  };

  const handleProductClick = (product) => {
    navigate(`/produtos/${product.id}`);
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Categoria', 'Status', 'Versão', 'Fabricante', 'Clientes'];
    const rows = filteredProducts.map(p => [
      p.nome,
      p.categoria || '',
      p.status || '',
      p.versao || '',
      p.fabricante || '',
      p.totalClientes || 0
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `produtos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Relatório exportado!');
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'ativo': return 'success';
      case 'desenvolvimento': return 'warning';
      case 'descontinuado': return 'danger';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container>
        <Breadcrumb>
          <SkeletonLine width="200px" height="20px" />
        </Breadcrumb>
        <Header>
          <SkeletonLine width="300px" height="40px" />
          <SkeletonLine width="500px" height="20px" style={{ marginTop: '1rem' }} />
        </Header>
        <HeaderStats>
          {[1, 2, 3, 4].map(i => (
            <StatCard key={i}>
              <SkeletonLine width="60px" height="30px" />
              <SkeletonLine width="100px" height="16px" style={{ marginTop: '0.5rem' }} />
            </StatCard>
          ))}
        </HeaderStats>
        <ProductsSection>
          <ProductsGrid viewMode={viewMode}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i}>
                <SkeletonImage />
                <div style={{ padding: '1.5rem' }}>
                  <SkeletonLine width="80%" height="24px" />
                  <SkeletonLine width="100%" height="16px" style={{ marginTop: '1rem' }} />
                  <SkeletonLine width="90%" height="16px" style={{ marginTop: '0.5rem' }} />
                  <SkeletonLine width="60%" height="16px" style={{ marginTop: '0.5rem' }} />
                </div>
              </SkeletonCard>
            ))}
          </ProductsGrid>
        </ProductsSection>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem onClick={() => navigate('/')}>
          {Icons.Home()} Início
        </BreadcrumbItem>
        <BreadcrumbItem active>Produtos</BreadcrumbItem>
      </Breadcrumb>

      <Header>
        <Title>Produtos & Soluções</Title>
        <Subtitle>
          Explore nossa linha completa de produtos e soluções para medição de energia
        </Subtitle>
      </Header>

      <HeaderStats>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>{Icons.Package()} Total de Produtos</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.ativos}</StatValue>
          <StatLabel>{Icons.Zap()} Produtos Ativos</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalClientes}</StatValue>
          <StatLabel>{Icons.Users()} Total de Clientes</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.categorias}</StatValue>
          <StatLabel>{Icons.Package()} Categorias</StatLabel>
        </StatCard>
      </HeaderStats>

      <FiltersSection>
        <SearchContainer>
          <SearchIcon>{Icons.Search()}</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar por nome, categoria, descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterRow>
          <FilterGroup>
            <FilterLabel>Categoria</FilterLabel>
            <FilterSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Fabricante</FilterLabel>
            <FilterSelect
              value={selectedFabricante}
              onChange={(e) => setSelectedFabricante(e.target.value)}
            >
              {fabricantes.map(fab => (
                <option key={fab.value} value={fab.value}>{fab.label}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              title="Visualização em grade"
            >
              {Icons.Grid()}
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              title="Visualização em lista"
            >
              {Icons.List()}
            </ViewButton>
          </ViewToggle>
        </FilterRow>

        {activeFilters.length > 0 && (
          <ActiveFiltersBar>
            <span>Filtros ativos:</span>
            {activeFilters.map((filter, idx) => (
              <FilterChip key={idx} onClick={() => removeFilter(filter.type)}>
                {filter.value} {Icons.X()}
              </FilterChip>
            ))}
            <ClearAllButton onClick={clearFilters}>
              Limpar todos
            </ClearAllButton>
          </ActiveFiltersBar>
        )}
      </FiltersSection>

      <ProductsSection>
        <ProductsHeader>
          <ProductCount>
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </ProductCount>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FilterLabel style={{ margin: 0 }}>Ordenar por:</FilterLabel>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="nome">Nome (A-Z)</option>
              <option value="versao">Versão</option>
              <option value="clientes">Mais Clientes</option>
              <option value="recente">Mais Recente</option>
            </SortSelect>
            
            <ExportButton onClick={exportToCSV}>
              {Icons.Download()} Exportar
            </ExportButton>
          </div>
        </ProductsHeader>

        {filteredProducts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>{Icons.Package()}</EmptyIcon>
            <EmptyTitle>Nenhum produto encontrado</EmptyTitle>
            <EmptyText>
              Tente ajustar os filtros ou termos de busca para encontrar o que procura
            </EmptyText>
            {activeFilters.length > 0 && (
              <ActionButton onClick={clearFilters} style={{ marginTop: '1.5rem' }}>
                Limpar Filtros
              </ActionButton>
            )}
          </EmptyState>
        ) : (
          <ProductsGrid viewMode={viewMode}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                viewMode={viewMode}
                onClick={() => handleProductClick(product)}
              >
                <ProductImageContainer viewMode={viewMode}>
                  {product.imagemUrl ? (
                    <ProductImage src={product.imagemUrl} alt={product.nome} />
                  ) : (
                    <ProductImagePlaceholder>
                      {Icons.Package()}
                      <span>Sem imagem</span>
                    </ProductImagePlaceholder>
                  )}
                  
                  <BadgeContainer>
                    <StatusBadge variant={getStatusVariant(product.status)}>
                      {product.status || 'Ativo'}
                    </StatusBadge>
                    {product.versao && (
                      <VersionBadge>v{product.versao}</VersionBadge>
                    )}
                  </BadgeContainer>
                </ProductImageContainer>

                <ProductContent viewMode={viewMode}>
                  <ProductName>{product.nome}</ProductName>

                  {product.descricao && (
                    <ProductDescription>
                      {product.descricao.substring(0, 120)}
                      {product.descricao.length > 120 && '...'}
                    </ProductDescription>
                  )}

                  <ProductMeta>
                    {product.categoria && (
                      <MetaItem>
                        <MetaIcon>{Icons.Package()}</MetaIcon>
                        <MetaText>{product.categoria}</MetaText>
                      </MetaItem>
                    )}
                    {product.fabricante && (
                      <MetaItem>
                        <MetaIcon>{Icons.Factory()}</MetaIcon>
                        <MetaText>{product.fabricante}</MetaText>
                      </MetaItem>
                    )}
                  </ProductMeta>

                  <QuickStats>
                    <StatItem>
                      <MetaIcon>{Icons.Users()}</MetaIcon>
                      <MetaText>{product.totalClientes || 0} clientes</MetaText>
                    </StatItem>
                    <StatItem>
                      <MetaIcon>{Icons.Eye()}</MetaIcon>
                      <MetaText>{product.visualizacoes || 0} views</MetaText>
                    </StatItem>
                  </QuickStats>

                  <ProductActions viewMode={viewMode}>
                    <PrimaryButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      Ver Detalhes
                    </PrimaryButton>
                    {product.linkDocumentacao && (
                      <ActionButton
                        as="a"
                        href={product.linkDocumentacao}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {Icons.FileText()} Documentação
                      </ActionButton>
                    )}
                  </ProductActions>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>
        )}
      </ProductsSection>
    </Container>
  );
}