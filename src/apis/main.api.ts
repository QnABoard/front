import { mainPosts, mainTags } from '@/types/main.model';
import { httpClient } from './http.api';
import { Pagination } from '@/types/pagination.model';

export interface FetchMainDataParams {
  tag_id?: number;
  currentPage: number;
  limit: number;
}

interface FetchMainDataResponse {
  posts: mainPosts[];
  tags: mainTags[];
  pagination: Pagination;
}

// 기본 게시물 요청
export const fetchMainData = async (params: FetchMainDataParams) => {
  const response = await httpClient.get<FetchMainDataResponse>('/api/main', { params: params });
  try {
    console.log("basic ask", response.data);
    return response.data;
  } catch {
    throw Error;
  }
}