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

export interface DecodedToken {
  id: number;
  email: string;
  nickname: string;
  role: string;
  iat: number;
  exp: number;
}
