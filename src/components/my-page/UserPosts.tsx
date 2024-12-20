import { fetchUserInfo } from '@/apis/user-info.api';
import { RootState } from '@/store/rootReducer';
import React from 'react';
import { useSelector } from 'react-redux';

const UserPosts = () => {
  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );
  const response = fetchUserInfo(nickname as string);
  return <div>UserPosts</div>;
};

export default UserPosts;
