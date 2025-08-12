import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

export const Navbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.img`
  height: 45px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavItem = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: #555;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #667eea;
    background-color: rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  z-index: 1;
  opacity: 0.6;
`;

export const SearchInput = styled.input`
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 25px;
  width: 250px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    width: 300px;
  }

  &::placeholder {
    color: #999;
  }
`;

export const LogoutButton = styled.button`
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
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

export const WelcomeSection = styled.section`
  width: 100%;
`;

export const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
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
      case 'success':
        return `
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        `;
      case 'info':
        return `
          background-color: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        `;
      case 'warning':
        return `
          background-color: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        `;
      default:
        return `
          background-color: #f8f9fa;
          color: #495057;
          border: 1px solid #dee2e6;
        `;
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
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

export const StatIcon = styled.div`
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductsSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const NotificationsSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-height: 600px;
  overflow-y: auto;
`;

export const SectionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
`;

export const ProductCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

export const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
`;

export const ProductStatus = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => {
    switch(props.status) {
      case 'Ativo':
        return `
          background-color: #d4edda;
          color: #155724;
        `;
      case 'Manutenção':
        return `
          background-color: #fff3cd;
          color: #856404;
        `;
      case 'Inativo':
        return `
          background-color: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background-color: #f8f9fa;
          color: #495057;
        `;
    }
  }}
`;

export const NotificationItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'info': return '#667eea';
      case 'warning': return '#f39c12';
      case 'success': return '#27ae60';
      default: return '#95a5a6';
    }
  }};
  background-color: ${props => {
    switch(props.type) {
      case 'info': return 'rgba(102, 126, 234, 0.05)';
      case 'warning': return 'rgba(243, 156, 18, 0.05)';
      case 'success': return 'rgba(39, 174, 96, 0.05)';
      default: return 'rgba(149, 165, 166, 0.05)';
    }
  }};
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => {
      switch(props.type) {
        case 'info': return 'rgba(102, 126, 234, 0.1)';
        case 'warning': return 'rgba(243, 156, 18, 0.1)';
        case 'success': return 'rgba(39, 174, 96, 0.1)';
        default: return 'rgba(149, 165, 166, 0.1)';
      }
    }};
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NotificationIcon = styled.div`
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

export const NotificationContent = styled.div`
  flex: 1;
`;

export const NotificationTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.3rem 0;
`;

export const NotificationText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
`;

export const NotificationTime = styled.span`
  color: #999;
  font-size: 0.8rem;
`;