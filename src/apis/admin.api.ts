import { AdminData } from '@/types/admindata';
import { httpClient } from './http.api';

export const fetchAdminData = async () => {
  try {
    const response = await httpClient.get<AdminData[]>('/api/admin');
    console.log('응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin data:', error);
    throw error;
  }
};
