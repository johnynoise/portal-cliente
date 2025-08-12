import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

export const Container = styled.main`
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  background-attachment: fixed;
  animation: ${fadeIn} 0.8s ease;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: rgba(0, 0, 0, 0.6);

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const Header = styled.div`
  text-align: center;
  padding: 3rem 2rem 2rem;
  color: rgba(0, 0, 0, 0.8);
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const StatsSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

export const HelpfulSection = styled.section`
  margin: 3rem 2rem 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    margin: 2rem 1rem;
  }
`;

export const HelpfulTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0 2rem 0;
`;

export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const QuickActionCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .content {
    text-align: left;
    flex: 1;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.3rem;
  }

  .description {
    font-size: 0.9rem;
    color: #666;
  }
`;

export const FiltersSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 2rem;
  border-radius: 20px 20px 0 0;
  padding: 2rem;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
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
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #999;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const FilterTab = styled.button`
  padding: 0.7rem 1.2rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .count {
    background: rgba(255, 255, 255, 0.3);
    padding: 0.1rem 0.4rem;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    ${props => !props.active && `
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    `}
  }
`;

export const SortContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

export const SortButton = styled.button`
  padding: 0.6rem 1rem;
  border: 1px solid ${props => props.active ? '#667eea' : '#ddd'};
  background: ${props => props.active ? 
    'linear-gradient(45deg, #667eea, #764ba2)' : 
    'white'
  };
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.85rem;

  &:hover {
    transform: translateY(-1px);
    ${props => !props.active && `
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    `}
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 0 2rem 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    margin: 0 1rem 1rem;
  }
`;

export const FaqSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
  padding: 2rem;
  min-height: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const ResultsCount = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 600;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const EmptyText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto 2rem;
`;

export const SuggestButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FaqItem = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const FaqHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.02);
  }
`;

export const QuestionIcon = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  flex-shrink: 0;
`;

export const Question = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ isOpen }) => (isOpen ? '#667eea' : '#2c3e50')};
    margin: 0 0 0.5rem 0;
    transition: color 0.3s ease;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .popular {
    font-size: 0.8rem;
    color: #e67e22;
    font-weight: 600;
  }
`;

export const CategoryBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch(props.category) {
      case 'Conta':
        return `
          background: rgba(52, 152, 219, 0.1);
          color: #3498db;
        `;
      case 'Produtos':
        return `
          background: rgba(46, 204, 113, 0.1);
          color: #2ecc71;
        `;
      case 'Suporte':
        return `
          background: rgba(230, 126, 34, 0.1);
          color: #e67e22;
        `;
      case 'Documentação':
        return `
          background: rgba(155, 89, 182, 0.1);
          color: #9b59b6;
        `;
      default:
        return `
          background: rgba(149, 165, 166, 0.1);
          color: #95a5a6;
        `;
    }
  }}
`;

export const ViewsCount = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

export const ToggleIcon = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const AnswerWrapper = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: all 0.4s ease;
  background: rgba(102, 126, 234, 0.02);
`;

export const Answer = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  border-left: 4px solid #667eea;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  background: white;
  border-radius: 8px;
`;

export const FaqFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const HelpfulButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 0.9rem;
    color: #666;
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const HelpfulButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid ${props => props.voted ? '#667eea' : '#ddd'};
  background: ${props => props.voted ? 
    (props.helpful ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)') : 
    'white'
  };
  color: ${props => props.voted ? 
    (props.helpful ? '#27ae60' : '#e74c3c') : 
    '#666'
  };
  border-radius: 20px;
  cursor: ${props => props.voted ? 'not-allowed' : 'pointer'};
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    ${props => !props.voted && `
      background: rgba(102, 126, 234, 0.1);
      border-color: #667eea;
    `}
  }
`;

export const ShareButton = styled.button`
  padding: 0.5rem 1rem;
  background: white;
  color: #667eea;
  border: 1px solid #667eea;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

export const PopularFaqs = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
`;

export const PopularTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
`;

export const PopularItem = styled.div`
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: rgba(102, 126, 234, 0.05);
    border-color: rgba(102, 126, 234, 0.2);
    transform: translateX(5px);
  }

  .question {
    font-size: 0.9rem;
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 0.3rem;
    line-height: 1.3;
  }
`;

export const ContactSection = styled.div``;

export const ContactCard = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
`;

export const ContactTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.8rem 0;
`;

export const ContactText = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
  margin: 0 0 1.2rem 0;
`;

export const ContactButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;