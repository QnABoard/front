import { fetchSolved } from '@/apis/content.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { useContent } from './useContent';
import { IPost } from '@/types/content';
import { useParams } from 'react-router';
import { RootState } from '@/store/rootReducer';
import { useSelector } from 'react-redux';

export const useSolved = () => {
  const { content_id } = useParams();
  const { posts } = useContent({ content_id });
  const queryClient = useQueryClient();
  const [post, setPost] = useState<IPost>();
  const nicknameCheck = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  useEffect(() => {
    setPost(posts);
  }, [posts]);

  const toggleSolvedMutation = useMutation<
    void,
    Error,
    { content_id: string | undefined }
  >({
    mutationFn: async ({ content_id }) => {
      if (!content_id || !post) return;
      await fetchSolved({ content_id });
      setPost({
        ...post,
        solved: post.solved,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['content', content_id],
      });
    },
  });

  const handleSolvedClick = () => {
    toggleSolvedMutation.mutate({ content_id });
  };

  return { content_id, nicknameCheck, post, handleSolvedClick };
};
