export interface IPost {
  id: number;
  title: string;
  content: string;
  tags: string | null;
  nickname: string;
  created_at: string;
  updated_at: string | null;
  view: number;
  like_count: number;
  solved: number; // boolean
  liked: number; // boolean
}

export interface IComments {
  id: number;
  nickname: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string | null;
}

export interface IContent {
  post: IPost[];
  comments: IComments[];
}
