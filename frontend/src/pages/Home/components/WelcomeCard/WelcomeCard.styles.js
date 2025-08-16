import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%,100%{scale:1;}
  50%{scale:1.05;}
`;

export const WelcomeCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-5px); }

  @media(max-width:768px){ flex-direction: column; text-align:center; }
`;

export const UserAvatar = styled.div`
  width: 80px; height: 80px; border-radius:50%;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  display:flex; align-items:center; justify-content:center;
  font-size:2rem; font-weight:bold; color:white;
  box-shadow:0 4px 15px rgba(102,126,234,0.3);
  animation: ${pulse} 2s infinite;
`;

export const UserInfo = styled.div`flex:1;`;

export const UserName = styled.h2`
  font-size:1.8rem; font-weight:700; color:#2c3e50; margin:0 0 0.5rem 0;
`;

export const UserStatus = styled.div`
  display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
  span{ color:#666; font-size:0.9rem; }
`;

export const Badge = styled.span`
  padding:0.3rem 0.8rem; border-radius:15px; font-size:0.8rem; font-weight:600;
  ${({ type }) => {
    switch(type){
      case 'success': return `background:#d4edda; color:#155724; border:1px solid #c3e6cb;`;
      case 'info': return `background:#d1ecf1; color:#0c5460; border:1px solid #bee5eb;`;
      case 'warning': return `background:#fff3cd; color:#856404; border:1px solid #ffeaa7;`;
      default: return `background:#f8f9fa; color:#495057; border:1px solid #dee2e6;`;
    }
  }}
`;

export const QuickActions = styled.div`
  display:flex; gap:1rem; flex-wrap:wrap;
  @media(max-width:768px){ justify-content:center; }
`;

export const ActionButton = styled.button`
  padding:0.8rem 1.2rem; border:none; border-radius:12px;
  background: linear-gradient(45deg, #3c56e7, #5a67d8); color:white; font-weight:600;
  cursor:pointer; transition:all 0.3s ease, background-color 0.3s ease;
  box-shadow:0 4px 15px rgba(102,126,234,0.3); font-size:0.9rem;
  &:hover{ transform:translateY(-3px); box-shadow:0 6px 20px rgba(102,126,234,0.4); }
  &:active{ transform:translateY(-1px); }
`;
