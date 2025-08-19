// frontend/src/pages/Home/components/WelcomeCard/WelcomeCard.jsx
import React from 'react';
import { 
  WelcomeCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserStatus,
  Badge,
  WelcomeActions,
  WelcomeActionButton
} from '../../Home.styles';

const WelcomeCardComponent = ({ user, message, actions = [] }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <WelcomeCard>
      <UserAvatar>
        {getInitials(user?.name)}
      </UserAvatar>
      
      <UserInfo>
        <UserName>
          {getCurrentTime()}, {user?.name || 'Cliente'}!
        </UserName>
        
        <UserStatus>
          <span>{message}</span>
          {user?.role && <Badge type="info">{user.role}</Badge>}
          <Badge type="success">Portal Ativo</Badge>
        </UserStatus>

        {actions && actions.length > 0 && (
          <WelcomeActions>
            {actions.map((action, index) => (
              <WelcomeActionButton
                key={index}
                primary={index === 0}
                onClick={action.action}
              >
                {action.label}
              </WelcomeActionButton>
            ))}
          </WelcomeActions>
        )}
      </UserInfo>
    </WelcomeCard>
  );
};

export default WelcomeCardComponent;