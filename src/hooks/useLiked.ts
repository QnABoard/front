import { fetchLikedPost } from '@/apis/content.api';
import { useContent } from './useContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { useLocation, useNavigate, useParams } from 'react-router';
import { IPost } from '@/types/content';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useLiked = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { content_id } = useParams();
  const { posts } = useContent({ content_id });
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    setPost(posts);
  }, [posts]);

  const toggleLikeMutation = useMutation<
    void,
    Error,
    { content_id: string | undefined }
  >({
    mutationFn: async ({ content_id }) => {
      if (!content_id || !post) return;
      await fetchLikedPost({ content_id });
      setPost({
        ...post,
        liked: post?.liked,
        like_count: post?.liked ? post?.like_count - 1 : post?.like_count + 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['content', content_id],
      });
    },
  });

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      const loginRequest = confirm(
        '로그인 후 이용할 수 있는 기능입니다.\n로그인 하시겠습니까??'
      );
      if (loginRequest) {
        navigate('/login', { state: { from: location.pathname } });
      }

      return;
    }
    toggleLikeMutation.mutate({ content_id });
  };

  return { post, handleHeartClick };
};
