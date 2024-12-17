import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_TIMEOUT = 30000; // 요청 제한 시간

// 토큰 관리 함수
function getToken(): string | null {
  return localStorage.getItem('token');
}

function setToken(token: string) {
  localStorage.setItem('token', token);
}

function removeToken() {
  localStorage.removeItem('token');
}

export const createClient = (config?: AxiosRequestConfig) => {
  const token = getToken(); // 토큰 가져오기
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 로그인 만료 처리
      if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

// 토큰 관련 함수 export
export { setToken, removeToken, getToken };

// 공통 요청 부분

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <R = undefined, T = undefined>(
  method: RequestMethod,
  url: string,
  payload?: T
) => {
  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post<R>(url, payload);
      break;
    case 'get':
      response = await httpClient.get<R>(url);
      break;
    case 'put':
      response = await httpClient.put<R>(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete<R>(url);
      break;
  }

  return response.data;
};
