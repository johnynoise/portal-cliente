import { toast } from 'react-toastify';

// Toast de sucesso (verde)
export const showSuccess = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
  });
};

// Toast de erro (vermelho)
export const showError = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
  });
};

// Toast informativo (azul)
export const showInfo = (message) => {
  toast.info(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
  });
};
