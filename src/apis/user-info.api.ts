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
    console.error('Error fetching admin data:', error);
    throw error;
  }
};
