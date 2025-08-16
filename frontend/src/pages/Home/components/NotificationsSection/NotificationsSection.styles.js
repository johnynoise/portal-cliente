import styled from 'styled-components';
import { notificationColors } from '../../Home.styles';

export const NotificationsSection = styled.section`
  background: rgba(255,255,255,0.95); backdrop-filter:blur(10px);
  border-radius:20px; padding:2rem; box-shadow:0 8px 30px rgba(0,0,0,0.1);
  border:1px solid rgba(255,255,255,0.2);
  max-height:600px; overflow-y:auto; display:flex; flex-direction:column; gap:1rem;
`;

export const SectionTitle = styled.h3`
  font-size:1.4rem; font-weight:700; color:#2c3e50; margin:0 0 1rem 0; display:flex; align-items:center;
`;

export const NotificationItem = styled.div`
  display:flex; gap:1rem; padding:1rem; border-left:4px solid ${({ type }) => notificationColors[type]?.border || notificationColors.default.border};
  background-color: ${({ type }) => notificationColors[type]?.bg || notificationColors.default.bg};
  border-radius:8px; transition: all 0.3s ease;

  &:hover {
    background-color: ${({ type }) => notificationColors[type]?.hover || notificationColors.default.hover};
    transform: translateX(5px);
  }
`;

export const NotificationIcon = styled.div`font-size:1.2rem; margin-top:0.2rem;`;

export const NotificationContent = styled.div`flex:1;`;

export const NotificationTitle = styled.h5`font-size:1rem; font-weight:600; color:#2c3e50; margin:0 0 0.3rem 0;`;

export const NotificationText = styled.p`color:#666; font-size:0.9rem; line-height:1.4; margin:0 0 0.5rem 0;`;

export const NotificationTime = styled.span`color:#999; font-size:0.8rem;`;
