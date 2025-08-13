import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

export const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b, #475569);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: #ef4444;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: white;
    font-weight: bold;
    animation: ${pulse} 2s infinite;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StatLabel = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export const StatValue = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.users { background: #dbeafe; color: #2563eb; }
  &.products { background: #dcfce7; color: #16a34a; }
  &.trending { background: #f3e8ff; color: #9333ea; }
  &.reports { background: #fef3c7; color: #d97706; }
`;

export const StatTrend = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  
  &.positive { color: #16a34a; }
  &.negative { color: #dc2626; }
  &.neutral { color: #64748b; }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainActions = styled.section`
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 2rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #3b82f6, #1d4ed8)'};
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    transition: color 0.3s ease;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

export const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: ${props => props.gradient || 'linear-gradient(135deg, #3b82f6, #1d4ed8)'};
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: #64748b;
  }
`;

export const CardArrow = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    background: #e2e8f0;
    transform: translateX(4px);
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SidebarSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    
    svg {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }
  }
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
  }
  
  .icon {
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
  
  .content {
    flex: 1;
    min-width: 0;
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: #1e293b;
    }
    
    span {
      font-size: 0.75rem;
      color: #64748b;
    }
  }
  
  .dismiss {
    cursor: pointer;
    color: #94a3b8;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0.25rem;
    
    &:hover {
      color: #64748b;
    }
  }
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3b82f6;
    margin-top: 0.4rem;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    min-width: 0;
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: #1e293b;
      line-height: 1.4;
    }
    
    span {
      font-size: 0.75rem;
      color: #64748b;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;