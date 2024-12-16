import httpClient from '@/apis/http.api';
import { mainData } from '@/model/main.model';

export const fetchMainData = async () => {
  const response = await httpClient.get<mainData>('/api/main');
  try {
    return response.data;
  } catch {
    throw Error;
  }
}