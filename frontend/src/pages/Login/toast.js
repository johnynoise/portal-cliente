import { toast } from 'react-toastify';

// Exibe toast de sucesso
export function showSuccess(message) {
  toast.success(message);
}

// Exibe toast de erro
export function showError(message) {
  toast.error(message);
}

// Exibe toast de informação
export function showInfo(message) {
  toast.info(message);
}
