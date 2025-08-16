import React from 'react';
import { NotificationsSection as Section, SectionTitle, NotificationItem, NotificationIcon, NotificationContent, NotificationTitle, NotificationText, NotificationTime } from './NotificationsSection.styles';

export default function NotificationsSection({ notifications }) {
  return (
    <Section>
      <SectionTitle>Notificações {notifications.length > 0 && `(${notifications.length})`}</SectionTitle>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} type={notification.type}>
          <NotificationIcon type={notification.type}>
            {notification.type === 'info' && 'ℹ️'}
            {notification.type === 'warning' && '⚠️'}
            {notification.type === 'success' && '✅'}
          </NotificationIcon>
          <NotificationContent>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationText>{notification.text}</NotificationText>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationContent>
        </NotificationItem>
      ))}
    </Section>
  );
}
