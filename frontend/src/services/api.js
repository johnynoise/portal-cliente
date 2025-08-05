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
  response => response, // retorna a resposta normalmente se não houve erro
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.error('Erro de autenticação:', error.response.data);
      // Token inválido ou expirado
      localStorage.removeItem('token');
      window.location.href = '/'; // redireciona para login (ajuste a rota se necessário)
    }
    return Promise.reject(error); // propaga o erro para quem chamou a API
  }
);

export default api;
