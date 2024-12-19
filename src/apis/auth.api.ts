import { JoinProps } from '@/pages/JoinPage';
import { httpClient } from './http.api';

export const join = async (data: JoinProps) => {
  const response = await httpClient.post('/api/users/join', data);
  return response.data;
};

export interface LoginResponse {
  message: any;
  success: boolean;
  token?: string;
}
