// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/hooks/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  // 다른 slice reducer가 있다면 여기에 추가
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
