export interface PostData {
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
