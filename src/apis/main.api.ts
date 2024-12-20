import { mainPosts, mainTags } from '@/types/main.model';
import { Pagination } from '@/types/pagination.model';
import { httpClient } from './http.api';

export interface FetchMainDataParams {
  selectedTags: number[];
  currentPage: number;
  limit: number;
}

export interface FetchMainDataResponse {
  posts: mainPosts[];
  tags: mainTags[];
  pagination: Pagination;
  filteredPosts: mainPosts[];
}


// 기본 및 태그별 게시물 요청
export const fetchMainData = async ({ selectedTags, currentPage, limit }: FetchMainDataParams): Promise<FetchMainDataResponse> => {
  try {
    // 기본 게시글 데이터 요청
    const responseMainData = await httpClient.get<FetchMainDataResponse>('/api/main', {
      params: { page: currentPage, limit }
    });

    // 태그별 필터링된 게시글 데이터 요청 (선택된 태그가 있을 때만)
    let filteredPosts: mainPosts[] = [];
    if (selectedTags.length > 0) {
      const params = new URLSearchParams();
      selectedTags.forEach(tag => params.append('tags', tag.toString()));
      const responsePostsByTags = await httpClient.get('/api/main/tags', { params });
      filteredPosts = responsePostsByTags.data;
    }

    return {
      posts: responseMainData.data.posts,  // 기본 게시글
      tags: responseMainData.data.tags,    // 태그 데이터
      pagination: responseMainData.data.pagination, // 페이지네이션 정보
      filteredPosts,  // 선택된 태그에 따라 필터링된 게시글 (없으면 빈 배열)
    };
  } catch {
    throw new Error("Failed to fetch data");
  }
}