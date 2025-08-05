import axios from 'axios';

// Crie uma instância do axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // ajuste sua URL base
});

// Adiciona o token no header de todas requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respostas para tratar erros de autenticação
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const errorMsg = (error.response.data.error || '').toLowerCase();

      if (
        errorMsg.includes('token expirado') ||
        errorMsg.includes('jwt expired') ||
        errorMsg.includes('token inválido') ||
        errorMsg.includes('invalid token')
      ) {
        console.error('Token inválido ou expirado detectado:', errorMsg);
        localStorage.removeItem('token');
        window.location.href = '/'; // Redireciona para a página de login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
