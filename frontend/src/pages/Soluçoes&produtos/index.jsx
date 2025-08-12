import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  FiltersSection,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FilterContainer,
  SortContainer,
  SortSelect,
  ViewToggle,
  ViewButton,
  ProductsSection,
  ProductsHeader,
  ProductCount,
  ProductsGrid,
  ProductCard,
  ProductImageContainer,
  ProductImage,
  ProductBadge,
  ProductContent,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductFeatures,
  FeatureTag,
  ProductActions,
  ActionButton,
  LoadingContainer,
  LoadingSpinner,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  CategoryFilter,
  CategoryTag,
  PriceRange,
  ResetFiltersButton
} from './solucoes.styles';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid ou list
  const [sortBy, setSortBy] = useState('nome');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  
  const navigate = useNavigate();

  // Mock categories - substitua pela sua lógica real
  const categories = [
    { id: 'all', name: 'Todos', count: 0 },
    { id: 'medidores', name: 'Medidores', count: 0 },
    { id: 'sensores', name: 'Sensores', count: 0 },
    { id: 'sistemas', name: 'Sistemas', count: 0 },
    { id: 'acessorios', name: 'Acessórios', count: 0 }
  ];

  const priceRanges = [
    { id: 'all', name: 'Todos os preços' },
    { id: 'low', name: 'Até R$ 1.000' },
    { id: 'medium', name: 'R$ 1.000 - R$ 5.000' },
    { id: 'high', name: 'Acima de R$ 5.000' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, selectedCategory, priceFilter, sortBy]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await api.get('/produtos');
      // Enriquecer dados com informações mockadas para demonstração
      const enrichedProducts = data.map(product => ({
        ...product,
        // Adicione campos mockados se não existirem na API
        categoria: product.categoria || 'medidores',
        preco: product.preco || Math.floor(Math.random() * 5000) + 500,
        descricao: product.descricao || 'Produto de alta qualidade com tecnologia avançada',
        caracteristicas: product.caracteristicas || ['IoT Enabled', 'Alta Precisão', 'Economia de Energia'],
        disponivel: product.disponivel !== false,
        novo: product.novo || false,
        promocao: product.promocao || false,
        rating: product.rating || (Math.random() * 2 + 3).toFixed(1) // 3.0 a 5.0
      }));
      setProducts(enrichedProducts);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        toast.error(error.message || 'Erro ao carregar produtos');
      }
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filtered = [...products];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descricao && product.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro de categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }

    // Filtro de preço
    if (priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        switch (priceFilter) {
          case 'low':
            return product.preco <= 1000;
          case 'medium':
            return product.preco > 1000 && product.preco <= 5000;
          case 'high':
            return product.preco > 5000;
          default:
            return true;
        }
      });
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'nome':
          return a.nome.localeCompare(b.nome);
        case 'preco-menor':
          return a.preco - b.preco;
        case 'preco-maior':
          return b.preco - a.preco;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }

  function clearFilters() {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceFilter('all');
    setSortBy('nome');
    setActiveFilters([]);
  }

  function handleProductClick(product) {
    navigate(`/produtos/${product.id}`);
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
          <p>Carregando produtos...</p>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Produtos & Soluções</Title>
        <Subtitle>
          Descubra nossa linha completa de produtos para suas necessidades energéticas
        </Subtitle>
      </Header>

      <FiltersSection>
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Pesquisar produtos, características..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterContainer>
          <CategoryFilter>
            {categories.map(category => (
              <CategoryTag
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </CategoryTag>
            ))}
          </CategoryFilter>

          <PriceRange>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </PriceRange>

          <SortContainer>
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="nome">Nome A-Z</option>
              <option value="preco-menor">Menor Preço</option>
              <option value="preco-maior">Maior Preço</option>
              <option value="rating">Melhor Avaliado</option>
            </SortSelect>
          </SortContainer>

          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              ⚏
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              ☰
            </ViewButton>
          </ViewToggle>
        </FilterContainer>

        {(searchTerm || selectedCategory !== 'all' || priceFilter !== 'all') && (
          <ResetFiltersButton onClick={clearFilters}>
            ✕ Limpar Filtros
          </ResetFiltersButton>
        )}
      </FiltersSection>

      <ProductsSection>
        <ProductsHeader>
          <ProductCount>
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </ProductCount>
        </ProductsHeader>

        {filteredProducts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>Nenhum produto encontrado</EmptyTitle>
            <EmptyText>
              Tente ajustar os filtros ou termos de busca para encontrar o que procura
            </EmptyText>
          </EmptyState>
        ) : (
          <ProductsGrid viewMode={viewMode}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                viewMode={viewMode}
                onClick={() => handleProductClick(product)}
              >
                <ProductImageContainer>
                  {product.imagemUrl ? (
                    <ProductImage src={product.imagemUrl} alt={product.nome} />
                  ) : (
                    <ProductImage 
                      src={`/api/placeholder/300/200?text=${encodeURIComponent(product.nome)}`} 
                      alt={product.nome} 
                    />
                  )}
                  
                  {product.novo && <ProductBadge type="new">Novo</ProductBadge>}
                  {product.promocao && <ProductBadge type="sale">Promoção</ProductBadge>}
                  {!product.disponivel && <ProductBadge type="unavailable">Indisponível</ProductBadge>}
                </ProductImageContainer>

                <ProductContent viewMode={viewMode}>
                  <ProductName>{product.nome}</ProductName>
                  
                  {product.descricao && (
                    <ProductDescription>{product.descricao}</ProductDescription>
                  )}

                  <ProductFeatures>
                    {product.caracteristicas?.slice(0, 3).map((feature, index) => (
                      <FeatureTag key={index}>{feature}</FeatureTag>
                    ))}
                  </ProductFeatures>

                  <ProductPrice>
                    {formatPrice(product.preco)}
                    {product.promocao && (
                      <span className="original-price">
                        {formatPrice(product.preco * 1.2)}
                      </span>
                    )}
                  </ProductPrice>

                  {product.rating && (
                    <div className="rating">
                      ⭐ {product.rating} ({Math.floor(Math.random() * 50) + 10} avaliações)
                    </div>
                  )}
                </ProductContent>

                <ProductActions viewMode={viewMode}>
                  <ActionButton
                    primary
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    Ver Detalhes
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info('Adicionado aos favoritos!');
                    }}
                  >
                    ♡ Favoritar
                  </ActionButton>
                </ProductActions>
              </ProductCard>
            ))}
          </ProductsGrid>
        )}
      </ProductsSection>
    </Container>
  );
}