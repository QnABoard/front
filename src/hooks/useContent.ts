import { fetchContent, FetchContentParams } from '@/apis/content.api';
import { IContent, IPost } from '@/types/content';
import { useEffect, useState } from 'react';

export const useContent = ({ content_id }: FetchContentParams) => {
  const [content, setContent] = useState<IContent>();

  useEffect(() => {
    if (!content_id) return;
    const loadContent = async () => {
      try {
        const data = await fetchContent({ content_id });
        setContent(data);
      } catch (e) {
        console.log(e);
      }
    };
    loadContent();
  }, [content_id]);

  const post: IPost | undefined = content?.post ? content?.post[0] : undefined;
  return { post };
};
