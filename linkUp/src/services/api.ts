import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

api.interceptors.request.use((config) => {
  const persistRoot = localStorage.getItem('persist:root');
  
  if (persistRoot) {
    try {
      const rootState = JSON.parse(persistRoot);
      const authData = rootState.auth ? JSON.parse(rootState.auth) : null;

      if (authData && authData.token) {
        config.headers.Authorization = `Bearer ${authData.token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token do localStorage:", error);
    }
  }
  
  return config;
});

export default api;
