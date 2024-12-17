// userSlice.ts
import { DecodedToken, UserInfo, UserState } from '@/types/auth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const initialState: UserState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
  loading: false,
  error: null,
};

// 실제 서버에 로그인 요청을 보내고 토큰을 받아오는 thunk
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:3333/api/users/login',
        {
          email,
          password,
        }
      );

      if (response.data.success && response.data.token) {
        return response.data.token;
      } else {
        return rejectWithValue('로그인 실패: 토큰 없음');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || '로그인 요청 실패'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; userInfo: UserInfo }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.loading = false;
      state.error = null;

      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const decoded: DecodedToken = jwtDecode(action.payload);
        const userInfo: UserInfo = {
          id: decoded.id,
          email: decoded.email,
          nickname: decoded.nickname,
          role: decoded.role,
        };

        state.isLoggedIn = true;
        state.token = action.payload;
        state.userInfo = userInfo;
        state.loading = false;
        state.error = null;

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload);
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
