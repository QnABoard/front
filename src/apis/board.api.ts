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

export const updateUserIntroduce = async (id: number, content: string) => {
  {
    const response = await httpClient.put(`/api/users/${id}/intro`, {
      content,
    });
    return response.data;
  }
};
