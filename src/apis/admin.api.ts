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

export const deleteUser = async (id: number): Promise<{ success: boolean }> => {
  try {
    const response = await httpClient.delete(`/api/users/${id}/delete`);
    console.log('응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API 호출 실패:', error);
    throw new Error(
      error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.'
    );
  }
};
