import api from './api';
import { type GenericResponse } from '../types';

export const tweetService = {
  // Busca o feed (tweets dele + quem ele segue)
  getFeed: async () => {
    const res = await api.get<GenericResponse>('/feed');
    return res.data;
  },

  // Busca tweets de um usuário específico
  getByUser: async (userId: string) => {
    const res = await api.get<GenericResponse>(`/users/${userId}/tweets`);
    return res.data;
  },

  /** 
   * BUSCA USUÁRIOS (Para as sugestões e busca)
   */
  listUsers: async () => {
    const res = await api.get<GenericResponse>('/users');
    return res.data;
  },

  /** 
   * CRIA UM NOVO TWEET 
   */
  create: async (content: string) => {
    const res = await api.post<GenericResponse>('/tweets', { content });
    return res.data;
  },

  /** 
   * CURTIDAS 
   */
  like: async (tweetId: string) => {
    const res = await api.post<GenericResponse>('/likes', { tweetId });
    return res.data;
  },

  dislike: async (tweetId: string) => {
    const res = await api.delete<GenericResponse>('/likes', {
      data: { tweetId }
    });
    return res.data;
  },

  /** 
   * EXCLUSÃO 
   */
  delete: async (tweetId: string) => {
    const res = await api.delete<GenericResponse>(`/tweets/${tweetId}`);
    return res.data;
  },

  /** 
   * SEGUIDORES
   */
  follow: async (userId: string) => {
    const res = await api.post<GenericResponse>('/followers', { userId });
    return res.data;
  },

  unfollow: async (userId: string) => {
    const res = await api.delete<GenericResponse>('/followers', {
      data: { userId }
    });
    return res.data;
  },

  reply: async (content: string, replyTo: string) => {
    const res = await api.post<GenericResponse>('/replies', { content, replyTo });
    return res.data;
  },
};
