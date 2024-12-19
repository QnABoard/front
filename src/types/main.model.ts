export interface mainUsers {
  users: string | null;
}
export interface mainTags {
  id: number | null;
  name: string;
  isActive?: boolean;
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
  users: mainUsers;
  tags: mainTags[];
  posts: mainPosts[];
}
