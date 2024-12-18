import { fetchContent, FetchContentParams } from '@/apis/content.api';
import { IPost } from '@/types/content';
import { useQuery } from '@tanstack/react-query';

export const useContent = ({ content_id }: FetchContentParams) => {
  const { data } = useQuery({
    queryKey: ['content', content_id],
    queryFn: async () => await fetchContent({ content_id }),
    enabled: !!content_id,
  });
  const posts: IPost | undefined = data ? data?.post[0] : undefined;
  return { posts };
};
