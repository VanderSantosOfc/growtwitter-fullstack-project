export interface UserDto {
  id: string;
  name: string;
  username: string;
  imageUrl?: string;
  following?: any[];
  followers?: any[];
}

export interface TweetDto {
  id: string;
  content: string;
  createdAt: string;
  author: UserDto;
  likes?: any[];
  replies?: any[];
}

export interface GenericResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// AJUSTADO: Nomes exatamente como no Backend
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    authToken: string; 
    authUser: UserDto;
  };
}