import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do seu projeto Spring
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Adiciona o Token JWT em todas as chamadas automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Bandejao:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;