export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  role: string;
}

export interface UserState {
  isLoggedIn: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

// 로그인 요청 데이터 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface APIError {
  message: string;
}

export interface DecodedToken {
  id: number;
  email: string;
  nickname: string;
  role: string;
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
