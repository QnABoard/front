// src/store/slices/authSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// 사용자 정보 인터페이스
interface User {
  email: string;
  nickname: string;
  role: 'user' | 'admin';
}

// 토큰 인터페이스
interface Tokens {
  accessToken: string;
}

// 인증 상태 인터페이스
export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  tokens: Tokens | null;
  error: string | null;
}

// 로그인 요청 페이로드 인터페이스
interface LoginPayload {
  email: string;
  password: string;
}

// 회원가입 요청 페이로드 인터페이스
interface SignupPayload {
  email: string;
  password: string;
  nickname: string;
}

// JWT 디코딩 인터페이스
interface DecodedToken {
  email: string;
  nickname: string;
  roles: string[];
  exp: number;
}

// LocalStorage 관련 유틸리티 함수
export const getToken = (): string | null =>
  localStorage.getItem('accessToken');
export const setToken = (token: string): void =>
  localStorage.setItem('accessToken', token);
export const removeToken = (): void => localStorage.removeItem('accessToken');

export const getNickname = (): string | null =>
  localStorage.getItem('nickname');
export const setNickname = (nickname: string): void =>
  localStorage.setItem('nickname', nickname);
export const removeNickname = (): void => localStorage.removeItem('nickname');

// 비동기 Thunk 액션 생성

// 회원가입 Thunk
export const signup = createAsyncThunk<
  { success: boolean },
  SignupPayload,
  { rejectValue: string }
>('auth/signup', async (data, thunkAPI) => {
  try {
    console.log('회원가입 요청 데이터:', data);
    const response = await axios.post('/api/signup', data);
    console.log('회원가입 성공 응답:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      '회원가입 실패:',
      error.response?.data?.message || error.message
    );
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || '회원가입 실패'
    );
  }
});

// 로그인 Thunk
export const login = createAsyncThunk<
  { user: User; tokens: Tokens },
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    console.log('로그인 요청 데이터:', credentials);
    const response = await axios.post('/api/login', credentials);
    const { token } = response.data;

    // JWT 디코딩하여 사용자 정보 추출
    const decoded: DecodedToken = jwtDecode(token);
    const role = decoded.roles.includes('admin') ? 'admin' : 'user';

    const userData: User = {
      email: decoded.email,
      nickname: decoded.nickname,
      role,
    };

    const tokensData: Tokens = {
      accessToken: token,
    };

    // 로컬스토리지에 토큰 저장
    setToken(tokensData.accessToken);
    setNickname(userData.nickname);

    console.log('로그인 성공:', { user: userData, tokens: tokensData });

    return { user: userData, tokens: tokensData };
  } catch (error: any) {
    console.error(
      '로그인 실패:',
      error.response?.data?.message || error.message
    );
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || '로그인 실패'
    );
  }
});

// 초기 상태 설정
const initialState: AuthState = {
  isLoggedIn: !!getToken(),
  user: getNickname()
    ? {
        email: '',
        nickname: getNickname() || '',
        role: 'user',
      }
    : null,
  tokens: getToken()
    ? {
        accessToken: getToken()!,
      }
    : null,
  error: null,
};

// 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그아웃 액션
    logout: (state) => {
      console.log('로그아웃 처리');
      state.isLoggedIn = false;
      state.user = null;
      state.tokens = null;
      state.error = null;
      removeToken();
      removeNickname();
    },
    // 에러 설정 액션
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // 에러 클리어 액션
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 회원가입
    builder.addCase(signup.pending, (state) => {
      console.log('회원가입 진행 중...');
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      console.log('회원가입 성공');
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log('회원가입 실패:', action.payload || '알 수 없는 오류');
      state.error = action.payload || '회원가입 실패';
    });

    // 로그인
    builder.addCase(login.pending, (state) => {
      console.log('로그인 진행 중...');
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: User; tokens: Tokens }>) => {
        console.log('로그인 성공');
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      console.log('로그인 실패:', action.payload || '알 수 없는 오류');
      state.error = action.payload || '로그인 실패';
    });
  },
});

// 액션 및 리듀서 내보내기
export const { logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
