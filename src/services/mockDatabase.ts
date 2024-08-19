import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Mock server URL
});

export const getNews = () => api.get('/news');
export const postNews = (news: any) => api.post('/news', news);
export const deleteNews = (id: number) => api.delete(`/news/${id}`);
export const updateNews = (id: number, news: any) => api.put(`/news/${id}`, news);
