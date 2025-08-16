import React from 'react';
import { WelcomeCard as Card, UserAvatar, UserInfo, UserName, UserStatus, Badge, QuickActions, ActionButton } from './WelcomeCard.styles';

export default function WelcomeCard({ user, onAction }) {
  return (
    <Card>
      <UserAvatar aria-label={`Avatar de ${user.name}`}>
        {user.name.charAt(0).toUpperCase()}
      </UserAvatar>
      <UserInfo>
        <UserName>Bem-vindo, {user.name}!</UserName>
        <UserStatus>
          <Badge type="success">Conta Ativa</Badge>
          <span>Último acesso: Hoje às 14:30</span>
        </UserStatus>
      </UserInfo>
      <QuickActions>
        <ActionButton onClick={() => onAction('relatorios')}>📊 Relatórios</ActionButton>
        <ActionButton onClick={() => onAction('produtos')}>📦 Produtos</ActionButton>
        <ActionButton onClick={() => onAction('suporte')}>💬 Suporte</ActionButton>
        <ActionButton onClick={() => onAction('configuracoes')}>⚙️ Config</ActionButton>
      </QuickActions>
    </Card>
  );
}
