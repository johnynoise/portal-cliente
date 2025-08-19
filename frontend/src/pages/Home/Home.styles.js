// frontend/src/pages/Home/Home.styles.js - VERSÃO COMPLETA
import styled, { keyframes } from 'styled-components';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Mapas de cores
export const statusColors = {
  Ativo: { bg: '#d4edda', color: '#155724' },
  Manutenção: { bg: '#fff3cd', color: '#856404' },
  Inativo: { bg: '#f8d7da', color: '#721c24' }
};

export const notificationColors = {
  info: { bg: 'rgba(102, 126, 234, 0.05)', border: '#667eea', hover: 'rgba(102, 126, 234, 0.1)' },
  warning: { bg: 'rgba(243, 156, 18, 0.05)', border: '#f39c12', hover: 'rgba(243, 156, 18, 0.1)' },
  success: { bg: 'rgba(39, 174, 96, 0.05)', border: '#27ae60', hover: 'rgba(39, 174, 96, 0.1)' },
  default: { bg: 'rgba(149, 165, 166, 0.05)', border: '#95a5a6', hover: 'rgba(149, 165, 166, 0.1)' }
};

export const productStatusColors = {
  'Certificado': { bg: '#d4edda', color: '#155724' },
  'Em Certificação': { bg: '#fff3cd', color: '#856404' },
  'Descontinuado': { bg: '#f8d7da', color: '#721c24' },
  'Em Desenvolvimento': { bg: '#d1ecf1', color: '#0c5460' }
};

export const priorityColors = {
  alta: { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' },
  media: { bg: '#fef3c7', color: '#d97706', border: '#fbbf24' },
  baixa: { bg: '#d1fae5', color: '#059669', border: '#6ee7b7' }
};

// Container principal
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.8s ease;
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

// WelcomeCard
export const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(255,255,255,0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
  animation: ${pulse} 2s infinite;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`;

export const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

export const Badge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;

  ${props => {
    switch(props.type) {
      case 'success': return `background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;`;
      case 'info': return `background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;`;
      case 'warning': return `background-color: #fff3cd; color: #856404; border: 1px solid #ffeaa7;`;
      default: return `background-color: #f8f9fa; color: #495057; border: 1px solid #dee2e6;`;
    }
  }}
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

// WelcomeCard Actions
export const WelcomeActions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const WelcomeActionButton = styled.button`
  padding: 0.6rem 1rem;
  border: 2px solid #3c56e7;
  border-radius: 8px;
  background: ${props => props.primary ? 'linear-gradient(45deg, #3c56e7, #5a67d8)' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#3c56e7'};
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(60, 86, 231, 0.3);
    background: ${props => props.primary ? 'linear-gradient(45deg, #2d46c7, #4c63d2)' : 'rgba(60, 86, 231, 0.05)'};
  }
`;

// StatsGrid
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 25px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
`;

export const StatIcon = styled.div`
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
`;

// Seções principais
export const ProductsSection = styled.section`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NotificationsSection = styled.section`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
`;

// Busca
export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3c56e7;
    box-shadow: 0 0 0 3px rgba(60, 86, 231, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1.1rem;
`;

// ProductCard melhorado
export const ProductCardEnhanced = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #f0f0f0;
  background: white;
  position: relative;

  &:hover {
    border-color: #667eea;
    transform: translateX(8px);
    box-shadow: 0 8px 25px rgba(102,126,234,0.15);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #3c56e7, #5a67d8);
    border-radius: 0 2px 2px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const ProductImage = styled.div`
  width: 120px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  border: 1px solid #e9ecef;
  flex-shrink: 0;
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
`;

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`;

export const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const ProductStatus = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ProductCategory = styled.span`
  font-size: 0.8rem;
  color: #3c56e7;
  background: rgba(60, 86, 231, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
`;

export const LastUpdate = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &::before {
    content: '🔄';
  }
`;

// Notificações melhoradas
export const NotificationItemEnhanced = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-left: 4px solid ${({ type }) => notificationColors[type]?.border || notificationColors.default.border};
  background-color: ${({ type }) => notificationColors[type]?.bg || notificationColors.default.bg};
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  ${({ priority }) => priority === 'alta' && `
    &::after {
      content: '⚡';
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-size: 1rem;
    }
  `}

  &:hover {
    background-color: ${({ type }) => notificationColors[type]?.hover || notificationColors.default.hover};
    transform: translateX(5px);
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const NotificationTitle = styled.h5`
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
  flex: 1;
`;

export const NotificationTime = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
  white-space: nowrap;
  margin-left: 1rem;
`;

export const NotificationText = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
`;

export const NotificationMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const NotificationCategory = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const PriorityBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-transform: uppercase;
`;

// Cards antigos (manter compatibilidade)
export const ProductCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #f0f0f0;
  background: white;

  &:hover {
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(102,126,234,0.1);
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-left: 4px solid ${({ type }) => notificationColors[type]?.border || notificationColors.default.border};
  background-color: ${({ type }) => notificationColors[type]?.bg || notificationColors.default.bg};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ type }) => notificationColors[type]?.hover || notificationColors.default.hover};
    transform: translateX(5px);
  }
`;

// Responsividade
export const ResponsiveGrid = styled.div`
  @media (max-width: 1200px) {
    ${StatsGrid} {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }

  @media (max-width: 768px) {
    ${Content} {
      padding: 1rem;
      gap: 1.5rem;
    }

    ${WelcomeCard} {
      padding: 1.5rem;
    }

    ${ProductsSection}, ${NotificationsSection} {
      padding: 1.5rem;
    }

    ${ProductCardEnhanced} {
      flex-direction: column;
      text-align: center;
      
      ${ProductImage} {
        width: 100px;
        height: 70px;
        margin: 0 auto;
      }
    }

    ${NotificationItemEnhanced} {
      flex-direction: column;
      gap: 0.5rem;
      
      ${NotificationHeader} {
        flex-direction: column;
        gap: 0.3rem;
      }
      
      ${NotificationTime} {
        margin-left: 0;
        align-self: flex-start;
      }
    }

    ${StatsGrid} {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    ${StatCard} {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    ${Content} {
      padding: 0.5rem;
    }

    ${UserName} {
      font-size: 1.4rem;
    }

    ${SectionTitle} {
      font-size: 1.2rem;
    }

    ${StatsGrid} {
      grid-template-columns: 1fr;
    }
  }
`;