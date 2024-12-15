import { http, HttpResponse } from 'msw';

interface IPost {
  title: string;
  content: string;
  userId: string;
  userNickname: string;
  created_at: string;
  updated_at: string;
  view: number;
  likes: number;
  solved: boolean;
  scrapped: boolean;
}

const dummyPost: IPost = {
  title: 'MSW 기본 설정 질문있습니다.',
  content: '질문이 있습니다 ...',
  userId: 'test123',
  userNickname: 'qna123',
  created_at: '2024-12-13',
  updated_at: '',
  view: 13,
  likes: 1,
  solved: false,
  scrapped: false,
};

export const contents = http.get(
  'http://localhost:3333/posts/:content_id',
  () => {
    return HttpResponse.json(dummyPost, {
      status: 200,
    });
  }
);

/**
 * http
 */
import axios, { AxiosRequestConfig } from 'axios';
const BASE_URL = 'http://localhost:3333';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: getToken() ? `Bearer ${getToken()}` : '',
    },
    withCredentials: true,
    ...config,
  });

  // axiosInstance.interceptors.request.use(
  // 	(config) => {
  // 		config.headers.Authorization = getToken() || '';
  // 		return config;
  // 	},
  // 	(error) => {
  // 		console.log(error);
  // 		return Promise.reject(error);
  // 	}
  // );

  // axiosInstance.interceptors.response.use(
  // 	(res) => {
  // 		return res;
  // 	},
  // 	(error) => {
  // 		// 로그인 만료처리
  // 		console.log(error);

  // 		if (error.response.status === 401) {
  // 			removeToken();
  // 			window.location.href = '/login';
  // 			return;
  // 		}
  // 		return Promise.reject(error);
  // 	}
  // );

  return axiosInstance;
};

export const httpClient = createClient();

/**
 * api
 */

export const fetchCategory = async () => {
  const response = await httpClient.get<IPost[]>(`/posts:${contents_id}`);

  return response.data;
};
