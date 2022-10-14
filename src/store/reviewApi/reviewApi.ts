import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../constants/methods';
import { REVIEW_URL } from '../../constants/pathes';
export const getReview = createAsyncThunk('getReview', async (action, { rejectWithValue }) => {
  try {
    const reviews = await fetch(REVIEW_URL, {
      method: GET,
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.json();
      }
    });
    return reviews;
  } catch (err) {
    return rejectWithValue(err);
  }
});
