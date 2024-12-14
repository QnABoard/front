import httpClient from './http.api'; // Axios 인스턴스 가져오기
import { JoinProps } from '@/pages/JoinPage';
import { LoginProps } from '@/pages/LoginPage';

// 회원가입 요청
export const join = async (userData: JoinProps) => {
  try {
    const { data, status } = await httpClient.post('/api/users/join', userData);

    if (status === 200) {
      console.log('회원가입 성공:', data);
      return data;
    } else if (status === 400 && data.message.includes('입력해주세요')) {
      console.error('필수 입력값 없음:', data.message);
      throw new Error(data.message);
    } else if (status === 400 && data.message.includes('중복된')) {
      console.error('중복 오류:', data.message);
      throw new Error(data.message);
    } else {
      throw new Error('알 수 없는 회원가입 에러가 발생했습니다.');
    }
  } catch (error) {
    console.error('회원가입 요청 중 에러 발생:', error);
    throw new Error('회원가입 요청에 실패했습니다. 관리자에게 문의하세요.');
  }
};

interface LoginResponse {
  message: any;
  success: boolean;
  token?: string;
}

// 로그인 요청
export const login = async (data: LoginProps): Promise<LoginResponse> => {
  try {
    const { data: responseData, status } = await httpClient.post<LoginResponse>(
      '/api/users/login',
      data
    );

    if (status === 200 && responseData.success) {
      console.log('로그인 성공:', responseData);
      return responseData;
    } else if (
      status === 400 &&
      responseData.message.includes('입력해주세요')
    ) {
      console.error('필수 입력값 없음:', responseData.message);
      throw new Error(responseData.message);
    } else if (
      status === 404 &&
      responseData.message.includes('등록되지 않은 이메일')
    ) {
      console.error('등록되지 않은 이메일:', responseData.message);
      throw new Error(responseData.message);
    } else if (
      status === 401 &&
      responseData.message.includes('비밀번호가 틀렸습니다')
    ) {
      console.error('비밀번호 오류:', responseData.message);
      throw new Error(responseData.message);
    } else {
      throw new Error('알 수 없는 로그인 에러가 발생했습니다.');
    }
  } catch (error) {
    console.error('로그인 요청 중 에러 발생:', error);
    throw new Error('로그인 요청에 실패했습니다. 관리자에게 문의하세요.');
  }
};
