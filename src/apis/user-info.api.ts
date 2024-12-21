import { httpClient } from './http.api';

export interface Profile {
  id: number;
  email: string;
  nickname: string;
  introduce: string;
  icon: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  view: number;
  solved: number;
  nickname: string;
  comment_count: number;
  like_count: number;
  tags: string;
}

export interface UserData {
  profile: Profile;
  posts: Post[];
}

export const fetchUserInfo = async (nickname: string) => {
  try {
    const url = `/api/users/${nickname}`;
    const response = await httpClient.get<UserData>(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const fetchUserLikes = async (nickname: string) => {
  try {
    const url = `/api/users/${nickname}/likes`;
    const response = await httpClient.get<{ posts: Post[] }>(url);
    console.log(response.data.posts);
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching user likes:', error);
    throw error;
  }
};

export const updateUserNickname = async (id: number, newNickname: string) => {
  try {
    const url = `/api/users/${id}/nickname`;
    console.log('url: ' + url);
    const response = await httpClient.put(url, { newNickname });
    console.log('닉네임 변경 resopnse: ' + response);
    return response.data; // 성공 시 { success: true } 반환
  } catch (error: any) {
    if (error.response) {
      console.error('에러:', error.response.data);
      throw new Error(error.response.data.message || '닉네임 수정 실패');
    }
    throw new Error('서버와의 연결에 문제가 발생했습니다.');
  }
};

export const updateUserIcon = async (id: number, profileIcon: File) => {
  try {
    const url = `/api/users/${id}/icon`;
    const formData = new FormData();
    formData.append('profileIcon', profileIcon);

    console.log('FormData content:', formData.get('profileIcon'));

    const response = await httpClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 명시적으로 설정
      },
    });

    console.log('프로필 아이콘 업데이트 응답:', response);
    return response.data; // 성공 시 { success: true } 반환
  } catch (error: any) {
    if (error.response) {
      console.error('에러 발생:', error.response.data);
      throw new Error(
        error.response.data.message || '프로필 아이콘 업데이트 실패'
      );
    }
    throw new Error('서버와의 연결에 문제가 발생했습니다.');
  }
};
