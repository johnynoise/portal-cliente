// frontend/src/pages/Home/components/NotificationsSection/NotificationSection.jsx
import React from 'react';
import { 
  NotificationsSection,
  SectionTitle,
  NotificationItemEnhanced,
  NotificationHeader,
  NotificationTitle,
  NotificationTime,
  NotificationText,
  NotificationMeta,
  NotificationCategory,
  PriorityBadge
} from '../../Home.styles';

// Cores para prioridades
const priorityColors = {
  alta: { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' },
  media: { bg: '#fef3c7', color: '#d97706', border: '#fbbf24' },
  baixa: { bg: '#d1fae5', color: '#059669', border: '#6ee7b7' }
};

// Cores para tipos de notificação
const notificationColors = {
  info: { bg: 'rgba(102, 126, 234, 0.05)', border: '#667eea', hover: 'rgba(102, 126, 234, 0.1)' },
  warning: { bg: 'rgba(243, 156, 18, 0.05)', border: '#f39c12', hover: 'rgba(243, 156, 18, 0.1)' },
  success: { bg: 'rgba(39, 174, 96, 0.05)', border: '#27ae60', hover: 'rgba(39, 174, 96, 0.1)' },
  default: { bg: 'rgba(149, 165, 166, 0.05)', border: '#95a5a6', hover: 'rgba(149, 165, 166, 0.1)' }
};

const NotificationsSectionComponent = ({ 
  title = "Notificações", 
  notifications, 
  showPriority = false,
  maxItems = null
}) => {
  const getNotificationIcon = (type) => {
    const icons = {
      'info': 'ℹ️',
      'warning': '⚠️',
      'success': '✅',
      'default': '📢'
    };
    return icons[type] || icons.default;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Certificação': '🏆',
      'Firmware': '🔄',
      'Sistema': '⚙️',
      'Produto': '📦',
      'Treinamento': '🎓'
    };
    return icons[category] || '📌';
  };

  const displayedNotifications = maxItems 
    ? notifications?.slice(0, maxItems) 
    : notifications;

  return (
    <NotificationsSection>
      <SectionTitle>
        🔔 {title}
        {notifications && notifications.length > 0 && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: '#6b7280', 
            fontWeight: 'normal',
            marginLeft: '0.5rem'
          }}>
            ({notifications.length})
          </span>
        )}
      </SectionTitle>

      {displayedNotifications && displayedNotifications.length > 0 ? (
        displayedNotifications.map((notification) => (
          <NotificationItemEnhanced 
            key={notification.id}
            type={notification.type}
            priority={notification.priority}
          >
            <div style={{ fontSize: '1.2rem', marginTop: '0.2rem' }}>
              {getNotificationIcon(notification.type)}
            </div>
            
            <div style={{ flex: 1 }}>
              <NotificationHeader>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationHeader>
              
              <NotificationText>{notification.text}</NotificationText>
              
              <NotificationMeta>
                {notification.category && (
                  <NotificationCategory>
                    {getCategoryIcon(notification.category)} {notification.category}
                  </NotificationCategory>
                )}
                
                {showPriority && notification.priority && (
                  <PriorityBadge 
                    priority={notification.priority}
                    style={{
                      backgroundColor: priorityColors[notification.priority]?.bg,
                      color: priorityColors[notification.priority]?.color,
                      border: `1px solid ${priorityColors[notification.priority]?.border}`
                    }}
                  >
                    {notification.priority}
                  </PriorityBadge>
                )}
                
                {notification.relatedProduct && (
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: '#6b7280',
                    background: '#f9fafb',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    📦 {notification.relatedProduct}
                  </span>
                )}
              </NotificationMeta>
            </div>
          </NotificationItemEnhanced>
        ))
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#6b7280', 
          padding: '2rem',
          fontSize: '0.9rem'
        }}>
          Nenhuma notificação no momento.
        </div>
      )}
    </NotificationsSection>
  );
};

export default NotificationsSectionComponent;