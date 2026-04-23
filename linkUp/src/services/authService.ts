import api from './api';

const authService = {
  /**
   * Rota no Backend: router.post("/auth/login", ...)
   */
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials); 
    return res.data; 
  },

  /**
   * Rota no Backend: router.post("/auth/register", ...)
   */
  register: async (userData: any) => {
    const res = await api.post('/auth/register', userData); 
    return res.data;
  }
};

export default authService;
