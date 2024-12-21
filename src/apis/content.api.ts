import { IContent } from '@/types/content';
import { httpClient } from './http.api';

export interface FetchContentParams {
  content_id: string | undefined;
}

export const fetchContent = async ({ content_id }: FetchContentParams) => {
  try {
    const response = await httpClient.get<IContent>(`/api/posts/${content_id}`);
    console.log('response: ' + response);
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchLikedPost = async ({ content_id }: FetchContentParams) => {
  try {
    const response = await httpClient.post(`/api/posts/${content_id}/like`);
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchSolved = async ({ content_id }: FetchContentParams) => {
  try {
    const response = await httpClient.post<void>(
      `api/posts/${content_id}/solved`
    );
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchContentDelete = async ({
  content_id,
}: FetchContentParams) => {
  try {
    const response = await httpClient.delete<void>(`api/posts/${content_id}`);
    return response.data;
  } catch (e) {
    console.log('에러났어', e);
  }
};
