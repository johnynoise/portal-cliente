import React from 'react';
import {
  DialogOverlay,
  DialogContainer,
  DialogIcon,
  DialogContent,
  DialogTitle,
  DialogMessage,
  DialogActions,
  DialogButton
} from './ConfirmDialog.styles';

export default function ConfirmDialog({ 
  title = 'Confirmação',
  message = 'Tem certeza?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning', // warning, danger, info
  onConfirm,
  onCancel 
}) {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❓';
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter') {
      onConfirm();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DialogOverlay onClick={handleOverlayClick}>
      <DialogContainer>
        <DialogIcon type={type}>
          {getIcon()}
        </DialogIcon>
        
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogMessage>{message}</DialogMessage>
        </DialogContent>

        <DialogActions>
          <DialogButton variant="secondary" onClick={onCancel}>
            {cancelText}
          </DialogButton>
          <DialogButton variant={type === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmText}
          </DialogButton>
        </DialogActions>
      </DialogContainer>
    </DialogOverlay>
  );
}