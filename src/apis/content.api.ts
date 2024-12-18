import { IContent } from '@/types/content';
import { requestHandler } from './http.api';

export interface FetchContentParams {
  content_id: string | undefined;
}

// export const fetchContent = async ({ content_id }: FetchContentParams) => {
//   try {
//     const response = await httpClient.get<IContent>(`/api/posts/${content_id}`);
//     return response.data;
//   } catch (e) {
//     console.log('에러났어', e);
//   }
// };

export const fetchContent = async ({ content_id }: FetchContentParams) => {
  try {
    return requestHandler<IContent>('get', `/api/posts/${content_id}`);
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchLikedPost = async ({ content_id }: FetchContentParams) => {
  try {
    return requestHandler<void>('post', `/api/posts/${content_id}/like`);
  } catch (e) {
    console.log('에러났어', e);
  }
};

export const fetchSolved = async ({ content_id }: FetchContentParams) => {
  try {
    return requestHandler<void>('post', `api/posts/${content_id}/solved`);
  } catch (e) {
    console.log('에러났어', e);
  }
};
