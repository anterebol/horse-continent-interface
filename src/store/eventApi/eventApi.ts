import { createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../../constants/headers';
import { GET, POST } from '../../constants/methods';
import { EVENT_URL } from '../../constants/pathes';
export const getEvents = createAsyncThunk('getEvents', async (action, { rejectWithValue }) => {
  try {
    const data = await fetch(EVENT_URL, {
      method: GET,
      headers: headers,
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.text().then((res) => JSON.parse(res));
      }
    });
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const addEvent = createAsyncThunk('addEvent', async (action: any, { rejectWithValue }) => {
  try {
    const data = await fetch(EVENT_URL, {
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
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
