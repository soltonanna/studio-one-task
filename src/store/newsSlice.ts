// newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NewsState {
  news: Array<any>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: 'idle',
  error: null
};

// Fetch news
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  const response = await axios.get(`${apiUrl}/news`);
  return response.data;
});

// Add news
export const addNews = createAsyncThunk('news/addNews', async (newsItem: any) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.post(`${apiUrl}/news`, newsItem);
  return response.data;
});

// Delete news
export const deleteNews = createAsyncThunk('news/deleteNews', async (id: string) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    await axios.delete(`${apiUrl}/news/${id}`);
    return id;
  } catch (error) {
    console.error('Failed to delete news item:', error);
    throw error;
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    updateNews: (state, action) => {
      state.news = state.news.map(news => (news.id === action.payload.id ? action.payload : news));
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.news = [action.payload, ...state.news];
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter(news => news.id !== action.payload);
      });
  }
});

export const { updateNews } = newsSlice.actions;
export default newsSlice.reducer;
