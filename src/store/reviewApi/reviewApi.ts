import { DELETE } from './../../constants/methods';
import { createUrl } from './../../utils/createUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../constants/methods';
import { REVIEW_URL } from '../../constants/pathes';
export const getReview = createAsyncThunk(
  'getReview',
  async (action: { page: string }, { rejectWithValue }) => {
    const { page } = action;
    try {
      const reviews = await fetch(REVIEW_URL + '/' + page, {
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
  }
);
export const getReviewPages = createAsyncThunk(
  'getReviewPages',
  async (action, { rejectWithValue }) => {
    try {
      const countPages = await fetch(REVIEW_URL + '/pages', {
        method: GET,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          return await res.json();
        }
      });
      return countPages;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const removeReview = createAsyncThunk(
  'removeReview',
  async (action: { id: string }, { rejectWithValue }) => {
    const { id } = action;
    try {
      await fetch(createUrl(REVIEW_URL, id), {
        method: DELETE,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          // return await res.json();
        }
      });
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
