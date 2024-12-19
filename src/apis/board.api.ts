import { httpClient } from './http.api';

export const fetchUpdateReview = async (
  title: string,
  tags: string[],
  content: string
) => {
  {
    const response = await httpClient.post('/api/posts', {
      title,
      tags,
      content,
    });
    return response.data;
  }
};
