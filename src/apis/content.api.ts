import { IContent } from '@/types/content';
import httpClient from './http.api';

export interface FetchContentParams {
  content_id: string | undefined;
}

export const fetchContent = async ({ content_id }: FetchContentParams) => {
  try {
    const response = await httpClient.get<IContent>(`/api/posts/${content_id}`);
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchLikedPost = async ({ content_id }: FetchContentParams) => {
  try {
    const response = await httpClient.post<IContent>(
      `/api/posts/${content_id}/like`
    );
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchLikedDeleted = async ({ content_id }: FetchContentParams) => {
  try {
    const response = await httpClient.delete<IContent>(
      `/api/posts/${content_id}/like`
    );
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};