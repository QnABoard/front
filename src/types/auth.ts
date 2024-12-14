export interface User {
  email: string;
  nickname: string;
  role: 'user' | 'admin';
}

// 토큰 인터페이스
interface Tokens {
  accessToken: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  tokens: Tokens | null;
  error: string | null;
}

// 로그인 요청 데이터 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
}

export interface APIError {
  message: string;
}

export interface DecodedToken {
  email: string;
  nickname: string;
  role: string | string[]; // 단일 문자열 또는 배열
  iat: number;
  exp: number;
}

// Thunk 반환 타입
export interface LoginThunkResponse {
  token: string; // JWT 토큰
  decodedToken: DecodedToken; // 디코딩된 데이터
}

export interface LoginResponse {
  message: any;
  success: boolean;
  token?: string;
}
