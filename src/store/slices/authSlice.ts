import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@/apis/auth.api';
import { LoginRequest, LoginResponse } from '@/types/auth';
import { DecodedToken, LoginThunkResponse } from '@/types/auth'; // 디코딩된 토큰 타입 가져오기
import { jwtDecode } from 'jwt-decode';

// 초기 상태
const initialState = {
  isLoggedIn: false,
  token: null as string | null,
  decodedToken: null as DecodedToken | null, // 디코딩된 토큰 정보
  loading: false,
  error: null as string | null,
};

export const loginThunk = createAsyncThunk<LoginThunkResponse, LoginRequest>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response: LoginResponse = await login(credentials);

      // 토큰이 없는 경우 처리
      if (!response.token) {
        throw new Error('Token is missing from the server response.');
      }

      // JWT 디코딩
      const decodedToken = jwtDecode<DecodedToken>(response.token);

      return {
        token: response.token,
        decodedToken,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || '로그인 요청 실패'
      );
    }
  }
);

// Slice 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;

      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.decodedToken = action.payload.decodedToken; // 디코딩된 정보 저장

        // 로컬스토리지에 토큰 저장
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // 에러 메시지 저장
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
