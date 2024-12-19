import { IContent } from '@/types/content';

export const dummyPost: IContent = {
  post: [
    {
      id: 4,
      title: '프론트 테스트용',
      content: '더미 데이터 더미 데이터 더미 데이터',
      created_at: '2024-12-14 11:44:26',
      updated_at: null,
      view: 0,
      solved: 0,
      nickname: '유저1',
      liked: 0,
      like_count: 13,
      tags: 'TypeScript,node.js,React',
      scrapped: 0,
    },
  ],
  comments: [
    {
      id: 3,
      nickname: 'dong1',
      parent_id: null,
      content: '첫번째 댓글',
      created_at: '2024-12-14 11:47:52',
      updated_at: null,
    },
    {
      id: 6,
      nickname: '유저1',
      parent_id: null,
      content: '두번째 댓글',
      created_at: '2024-12-14 11:47:52',
      updated_at: null,
    },
  ],
};

const dummy = {
  post: [
    {
      id: 4,
      title: '프론트 테스트용',
      content: '더미 데이터 더미 데이터 더미 데이터',
      created_at: '2024-12-14 11:44:26',
      updated_at: null,
      view: 0,
      solved: 0,
      nickname: '유저1',
      liked: 0,
      like_count: 0,
      tags: 'javascript,NodeJS,React',
    },
  ],
  comments: [
    {
      id: 3,
      nickname: 'dong1',
      parent_id: null,
      content: '첫번째 댓글',
      created_at: '2024-12-14 11:47:52',
      updated_at: null,
    },
    {
      id: 6,
      nickname: '유저1',
      parent_id: null,
      content: '두번째 댓글',
      created_at: '2024-12-14 11:47:52',
      updated_at: null,
    },
  ],
};
