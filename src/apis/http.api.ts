import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosHeaders,
  AxiosRequestHeaders,
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';
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
      const accessToken = getToken(); // 여기서 getToken()을 호출하여 실제로 사용
      if (accessToken) {
        if (
          config.headers &&
          'set' in config.headers &&
          typeof (config.headers as AxiosHeaders).set === 'function'
        ) {
          // AxiosHeaders 타입으로 헤더를 다루는 경우
          (config.headers as AxiosHeaders).set(
            'Authorization',
            `Bearer ${accessToken}`
          );
        } else {
          // 일반 객체로 헤더를 다루는 경우
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          } as AxiosRequestHeaders;
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

  return axiosInstance;
};

// 기본 Axios 인스턴스 생성
export const httpClient = createClient();

// 토큰 관련 함수 export
export { setToken, removeToken, getToken };

export default httpClient;
