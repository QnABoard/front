import { Pagination } from './pagination.model';

export interface mainTags {
  id: number | null;
  name: string;
}
export interface mainPosts {
  id: number;
  title: string;
  content: string;
  solved: number;
  nickname: string;
  created_at: string;
  comment_count: number;
  like_count: number;
  view: number;
  tags: string | null;
}

export interface mainData {
  tags: mainTags[];
  posts: mainPosts[];
  pagination: Pagination;
}