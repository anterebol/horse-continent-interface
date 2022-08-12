import { MAIN_URL } from './../../constants/pathes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../constants/methods';
export const mainApi = createAsyncThunk('main-api', async (_, { rejectWithValue }) => {
  try {
    const data = await fetch(MAIN_URL, {
      method: GET,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem('token') || '',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
    });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
