import { createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../../constants/headers';
import { GET, POST } from '../../constants/methods';
import { GALLERY_URL } from '../../constants/pathes';

export const getGallery = createAsyncThunk('getGallery', async (action, { rejectWithValue }) => {
  try {
    const gallery = await fetch(GALLERY_URL, {
      method: GET,
      headers: headers,
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.json();
      }
    });
    console.log(gallery);
    return gallery;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const addImage = createAsyncThunk('addImage', async (action, { rejectWithValue }) => {
  console.log(action);
  try {
    const image = await fetch(GALLERY_URL, {
      method: POST,
      headers: headers,
      body: JSON.stringify(action),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.json();
      }
    });
    return image;
  } catch (err) {
    return rejectWithValue(err);
  }
});
