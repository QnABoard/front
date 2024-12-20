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

export const updateUserIntroduce = async (id: number, intro: string) => {
  {
    const response = await httpClient.put(`/api/users/${id}/intro`, {
      intro,
    });
    console.log('인트로 변경 response: ' + response);
    return response.data;
  }
};
