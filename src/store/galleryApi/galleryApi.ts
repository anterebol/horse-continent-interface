import { createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../../constants/headers';
import { DELETE, GET, POST } from '../../constants/methods';
import { GALLERY_URL } from '../../constants/pathes';
import { createUrl } from '../../utils/createUrl';

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
export const removeGalleryImage = createAsyncThunk(
  'removeImage',
  async (action: { id: string }, { rejectWithValue }) => {
    const { id } = action;
    try {
      await fetch(createUrl(GALLERY_URL, id), {
        method: DELETE,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          // return await res.json();
        }
      });
      console.log(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
