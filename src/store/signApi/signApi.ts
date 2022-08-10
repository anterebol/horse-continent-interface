import { POST } from './../../constants/methods';
import { headers } from './../../constants/headers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_URL } from '../../constants/pathes';
import { AuthType } from '../../types/types';

export const signIn = createAsyncThunk('signIn', async (action: AuthType, { rejectWithValue }) => {
  try {
    const data = await fetch(AUTH_URL, {
      method: POST,
      headers: headers,
      body: JSON.stringify(action),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.text().then((res) => JSON.parse(res));
      }
    });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
