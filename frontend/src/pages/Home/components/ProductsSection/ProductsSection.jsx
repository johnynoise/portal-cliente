// frontend/src/pages/Home/components/ProductsSection/ProductsSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ProductsSection,
  SectionTitle,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ProductCardEnhanced,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductMeta,
  ProductStatus,
  ProductCategory,
  LastUpdate
} from '../../Home.styles';

// Mapas de cores para status dos produtos B2B
const productStatusColors = {
  'Certificado': { bg: '#d4edda', color: '#155724' },
  'Em Certificação': { bg: '#fff3cd', color: '#856404' },
  'Descontinuado': { bg: '#f8d7da', color: '#721c24' },
  'Em Desenvolvimento': { bg: '#d1ecf1', color: '#0c5460' }
};

const ProductsSectionComponent = ({ 
  title = "Produtos e Documentação", 
  products, 
  searchTerm, 
  onSearchChange,
  searchPlaceholder = "Buscar produtos..."
}) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    if (product.link) {
      navigate(product.link);
    }
  };

  const getProductIcon = (category) => {
    const icons = {
      'Medição Trifásica': '⚡',
      'Medição Inteligente': '🤖',
      'Medição Residencial': '🏠',
      'Medição Industrial': '🏭',
      'Infraestrutura': '🔧'
    };
    return icons[category] || '📊';
  };

  return (
    <ProductsSection>
      <SectionTitle>
        📦 {title}
      </SectionTitle>
      
      <SearchContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchContainer>

      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCardEnhanced 
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <ProductImage>
              {getProductIcon(product.category)}
            </ProductImage>
            
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              
              <ProductMeta>
                <ProductStatus 
                  style={{
                    backgroundColor: productStatusColors[product.status]?.bg || '#f8f9fa',
                    color: productStatusColors[product.status]?.color || '#495057'
                  }}
                >
                  {product.status}
                </ProductStatus>
                
                {product.category && (
                  <ProductCategory>{product.category}</ProductCategory>
                )}
                
                {product.lastUpdate && (
                  <LastUpdate>{product.lastUpdate}</LastUpdate>
                )}
                
                {product.firmware && (
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: '#6b7280',
                    background: '#f3f4f6',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '8px'
                  }}>
                    v{product.firmware}
                  </span>
                )}
              </ProductMeta>
            </ProductInfo>
          </ProductCardEnhanced>
        ))
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#6b7280', 
          padding: '2rem',
          fontSize: '0.9rem'
        }}>
          {searchTerm ? 'Nenhum produto encontrado para sua busca.' : 'Carregando produtos...'}
        </div>
      )}
    </ProductsSection>
  );
};

export default ProductsSectionComponent;