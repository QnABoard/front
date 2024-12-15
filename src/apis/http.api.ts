import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/utils/token'; // 토큰 유틸리티 함수 import
import { logout } from '@/store/slices/authSlice';
import { store } from '@/store/store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';
const DEFAULT_TIMEOUT = 30000; // 요청 제한 시간

// Axios 인스턴스 생성 함수
export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  // 요청 인터셉터: Authorization 헤더 동적 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getToken();
      if (accessToken) {
        if (config.headers && typeof config.headers.set === 'function') {
          // AxiosHeaders 객체 처리
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        } else {
          // 일반 객체 초기화
          config.headers = {
            ...config.headers, // 기존 헤더 유지
            Authorization: `Bearer ${accessToken}`,
          } as any;
        }
      }
      console.log('Request Headers:', config.headers); // 디버깅용 로그
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터: 401 상태 처리
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('401 Unauthorized: Logging out user...');
        removeToken(); // 토큰 삭제
        store.dispatch(logout()); // Redux 상태 초기화
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// 기본 Axios 인스턴스 생성
export const httpClient = createClient();

// 기본 Axios 인스턴스 내보내기
export default httpClient;
