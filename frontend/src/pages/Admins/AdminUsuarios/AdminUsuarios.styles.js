import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  background-attachment: fixed;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  .desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-only {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  color: #1a202c;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

export const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #2d3748;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

export const SearchAndFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #718096;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

export const BulkActions = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-left: 4px solid #4299e1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  span {
    font-weight: 500;
    color: #2d3748;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
`;

export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const TableHeader = styled.th`
  background: linear-gradient(135deg, #0c1c63ff 0%, #0e0746ff 100%);
  color: white;
  text-align: left;
  padding: 1rem;
  font-weight: 600;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  position: relative;
  user-select: none;

  &:hover {
    background: ${props => props.onClick ? 'linear-gradient(135deg, #3444d8ff 0%, #1227e9ff 100%)' : 'linear-gradient(135deg, #3444d8ff 0%, #1227e9ff 100%)'};
  }
`;

export const SortIcon = styled.span`
  margin-left: 0.5rem;
  opacity: ${props => props.active ? 1 : 0.5};
  transform: ${props => props.direction === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: all 0.2s ease;
  display: inline-block;
`;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const ActionButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => {
    if (props.danger) {
      return `
        background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
        color: white;
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
        }
      `;
    } else if (props.secondary) {
      return `
        background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
        color: white;
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(237, 137, 54, 0.3);
        }
      `;
    } else {
      return `
        background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
        color: white;
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
        }
      `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${props => props.status === 'active' ? `
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
  ` : `
    background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
    color: white;
  `}
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  h3 {
    color: #2d3748;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4a5568;
    font-size: 1rem;
  }
`;

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(226, 232, 240, 0.5);

    h4 {
      margin: 0;
      color: #2d3748;
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  .card-content {
    margin-bottom: 1.5rem;

    p {
      margin: 0.5rem 0;
      color: #4a5568;
      font-size: 0.9rem;

      strong {
        color: #2d3748;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;

export const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  color: ${props => props.active ? 'white' : '#2d3748'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    border-color: #667eea;
    background: ${props => props.active ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' : 'rgba(255, 255, 255, 0.95)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
  }
`;

export const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #667eea;
  cursor: pointer;
`;