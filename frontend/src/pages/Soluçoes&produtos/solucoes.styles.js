import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.main`
  min-height: calc(100vh - 80px);
  background: #f8fafc;
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  margin: 0 2rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    margin: 0 1rem 1.5rem;
    padding: 2rem 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FiltersSection = styled.section`
  background: white;
  border-radius: 16px;
  margin: 0 2rem 2rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    margin: 0 1rem 1.5rem;
    padding: 1.5rem;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  opacity: 0.6;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f8fafc;
  color: #0f172a;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

export const CategoryTag = styled.button`
  padding: 0.6rem 1.2rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e1e8ed'};
  background: ${props => props.active ? 
    'linear-gradient(45deg, #667eea, #764ba2)' : 
    'white'
  };
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    ${props => !props.active && `
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    `}
  }
`;

export const PriceRange = styled.div`
  select {
    padding: 0.7rem 1rem;
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
`;

export const SortContainer = styled.div``;

export const SortSelect = styled.select`
  padding: 0.7rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  background: #f0f0f0;
  border-radius: 12px;
  padding: 4px;
`;

export const ViewButton = styled.button`
  padding: 0.6rem 1rem;
  border: none;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #667eea, #764ba2)' : 
    'transparent'
  };
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #667eea, #764ba2)' : 
      'rgba(102, 126, 234, 0.1)'
    };
  }
`;

export const ResetFiltersButton = styled.button`
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.7rem 1.5rem;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #f5c6cb;
    transform: translateY(-2px);
  }
`;

export const ProductsSection = styled.section`
  margin: 0 2rem 2rem;
  
  @media (max-width: 768px) {
    margin: 0 1rem 1.5rem;
  }
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const ProductCount = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 600;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: white;
  
  p {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  border: 2px dashed #e2e8f0;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.3;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
`;

export const EmptyText = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
`;

export const ProductsGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  ${props => props.viewMode === 'grid' ? `
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  ` : `
    grid-template-columns: 1fr;
    gap: 1rem;
  `}
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  
  ${props => props.viewMode === 'list' ? `
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  ` : `
    display: flex;
    flex-direction: column;
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #cbd5e1;
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;
  
  ${props => props.viewMode === 'list' ? `
    width: 150px;
    height: 100px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
    }
  ` : `
    width: 100%;
    height: 220px;
  `}
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ProductBadge = styled.span`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => {
    switch(props.type) {
      case 'new':
        return `
          background: linear-gradient(45deg, #27ae60, #2ecc71);
          color: white;
        `;
      case 'sale':
        return `
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          color: white;
        `;
      case 'unavailable':
        return `
          background: rgba(0, 0, 0, 0.7);
          color: white;
        `;
      default:
        return `
          background: #f8f9fa;
          color: #495057;
        `;
    }
  }}
`;

export const ProductContent = styled.div`
  padding: 1.5rem;
  
  ${props => props.viewMode === 'list' ? `
    flex: 1;
    padding: 0;
    
    @media (max-width: 768px) {
      padding: 1rem 0;
      text-align: center;
    }
  ` : ''}
  
  .rating {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

export const ProductName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
`;

export const ProductDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const FeatureTag = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ProductPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 1rem;
  
  .original-price {
    font-size: 1rem;
    color: #999;
    text-decoration: line-through;
    margin-left: 0.5rem;
    font-weight: 400;
  }
`;

export const ProductActions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
  
  ${props => props.viewMode === 'list' ? `
    flex-direction: column;
    width: 150px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
      flex-direction: row;
      width: 100%;
      justify-content: center;
    }
  ` : `
    padding: 0 1.5rem 1.5rem;
  `}
`;

export const ActionButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  ${props => props.primary ? `
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    flex: 1;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  ` : `
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

// New styled components for professional B2B design
export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 2rem 1.5rem;
  font-size: 0.9rem;
  color: #64748b;
  
  @media (max-width: 768px) {
    margin: 0 1rem 1rem;
  }
`;

export const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${props => props.active ? 'default' : 'pointer'};
  color: ${props => props.active ? '#0f172a' : '#64748b'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: color 0.2s;

  &:not([active]):hover {
    color: #3b82f6;
  }

  &:not(:last-child)::after {
    content: '›';
    margin-left: 0.5rem;
    color: #cbd5e1;
  }
`;

export const HeaderStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 0 2rem 2rem;
  
  @media (max-width: 768px) {
    margin: 0 1rem 1.5rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #cbd5e1;
  }
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  flex: 1;
  min-width: 180px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  background: #f8fafc;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const ActiveFiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #64748b;
`;

export const FilterChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #eff6ff;
  color: #3b82f6;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dbeafe;
    border-color: #93c5fd;
  }
`;

export const ClearAllButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  color: #ef4444;
  border: 1px solid #fee2e2;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fef2f2;
    border-color: #fecaca;
  }
`;

export const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3b82f6;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #94a3b8;
  font-size: 3rem;
  
  span {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

export const StatusBadge = styled.span`
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: rgba(34, 197, 94, 0.9);
          color: white;
        `;
      case 'warning':
        return `
          background: rgba(251, 146, 60, 0.9);
          color: white;
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.9);
          color: white;
        `;
      default:
        return `
          background: rgba(100, 116, 139, 0.9);
          color: white;
        `;
    }
  }}
`;

export const VersionBadge = styled.span`
  padding: 0.375rem 0.875rem;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
`;

export const ProductMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

export const MetaIcon = styled.span`
  font-size: 1rem;
  color: #94a3b8;
`;

export const MetaText = styled.span`
  color: #475569;
  font-weight: 500;
`;

export const QuickStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #64748b;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(
    90deg,
    #f1f5f9 0px,
    #e2e8f0 40px,
    #f1f5f9 80px
  );
  background-size: 1000px;
  animation: ${shimmer} 2s infinite linear;
`;

export const SkeletonText = styled.div`
  height: 1rem;
  background: linear-gradient(
    90deg,
    #f1f5f9 0px,
    #e2e8f0 40px,
    #f1f5f9 80px
  );
  background-size: 1000px;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 4px;
`;

export const SkeletonLine = styled.div`
  height: ${props => props.height || '1rem'};
  width: ${props => props.width || '100%'};
  background: linear-gradient(
    90deg,
    #f1f5f9 0px,
    #e2e8f0 40px,
    #f1f5f9 80px
  );
  background-size: 1000px;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 8px;
`;