import { fetchContent, FetchContentParams } from '@/apis/content.api';
import { IContent } from '@/types/content';
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

  return { content };
};
