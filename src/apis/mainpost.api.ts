import httpClient from '@/apis/http.api';

export const fetchPosts = async () => {
  try {
    console.log('Requesting posts...');
    const response = await httpClient.get('/api/main');
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
