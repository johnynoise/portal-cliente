import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f8f9fa;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1200px) {
    padding: 2.5rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  p {
    color: #6c757d;
    margin-top: 0.5rem;
    font-size: 0.95rem;

    @media (min-width: 768px) {
      font-size: 1.05rem;
    }

    @media (min-width: 1200px) {
      font-size: 1.1rem;
    }
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: #212529;
  font-size: 1.75rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.5rem;
  }
`;

export const StatsBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  & > div {
    @media (max-width: 767px) {
      width: 100%;
      
      button {
        width: 100%;
      }
    }
  }
`;

export const SearchAndFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 1rem;
    color: #6c757d;
    z-index: 1;
  }
`;

export const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  @media (min-width: 768px) {
    width: 300px;
  }

  @media (min-width: 1200px) {
    width: 400px;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.active ? '#007bff' : '#e9ecef'};
  border-radius: 8px;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#6c757d'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    color: ${props => props.active ? 'white' : '#007bff'};
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 180px;
`;

export const FilterOption = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: ${props => props.active ? '#f8f9fa' : 'transparent'};
  color: ${props => props.active ? '#007bff' : '#212529'};
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
  }
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #007bff, #0056b3);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    &::before {
      transform: scaleX(1);
    }
  }

  @media (min-width: 768px) {
    border-radius: 12px;
    padding: 1.25rem;
    min-height: 420px;
  }

  @media (min-width: 1200px) {
    padding: 1.5rem;
    min-height: 450px;
  }
`;

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 1rem;
    gap: 1rem;
  }
`;

export const ProductBadge = styled.span`
  background: ${props => props.color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProductTitle = styled.h3`
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin: 0.75rem 0 0 0;
  }

  @media (min-width: 1200px) {
    font-size: 1.25rem;
  }
`;

export const ProductDescription = styled.p`
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  flex-grow: 1;

  @media (min-width: 768px) {
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
`;

export const ProductMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.85rem;

  svg {
    color: #007bff;
  }
`;

export const ProductLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  margin-top: auto;

  @media (min-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

export const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f8f9fa;
  color: #007bff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #e9ecef;

  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }

  svg {
    color: #007bff;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;

  @media (min-width: 768px) {
    gap: 0.5rem;
  }
`;

export const ActionButton = styled.button`
  padding: 0.4rem;
  border: 1px solid ${props => props.variant === 'danger' ? '#dc3545' : '#e9ecef'};
  border-radius: 4px;
  background: white;
  color: ${props => props.variant === 'danger' ? '#dc3545' : '#6c757d'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: ${props => props.variant === 'danger' ? '#dc3545' : '#007bff'};
    color: white;
    transform: translateY(-1px);
  }

  @media (min-width: 768px) {
    padding: 0.5rem;
    border-radius: 6px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e9ecef;

  svg {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #212529;
    font-weight: 600;
    font-size: 1.25rem;
  }

  p {
    color: #6c757d;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;

    h3 {
      font-size: 1.1rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e9ecef;
    border-left: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    color: #6c757d;
    margin: 0;
  }
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  opacity: 0;
  background-color: #2d3748;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.875rem;
  transition: opacity 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #2d3748 transparent transparent transparent;
  }
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SkeletonCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

export const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  margin-bottom: ${props => props.marginBottom || '0'};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: ${props => props.hasImage ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .placeholder {
    font-size: 3rem;
    color: white;
  }

  @media (min-width: 768px) {
    height: 200px;
  }
`;

export const StatusBadgeProduct = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: ${props => props.color};
  color: white;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px ${props => props.color}40;
`;