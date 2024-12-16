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
  created_at: string;
  updated_at: string;
  solved: boolean;
}
export interface mainData {
  users: mainUsers;
  tags: mainTags[];
  posts: mainPosts[];
}