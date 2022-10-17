import { createUrl } from './../../utils/createUrl';
import { DELETE, PUT } from './../../constants/methods';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../../constants/headers';
import { GET, POST } from '../../constants/methods';
import { EVENT_URL } from '../../constants/pathes';
import { EventType } from '../../types/types';
export const getEvents = createAsyncThunk('getEvents', async (action, { rejectWithValue }) => {
  try {
    const data = await fetch(EVENT_URL, {
      method: GET,
      headers: headers,
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.json();
      }
    });
    return data;
  } catch (err) {
    console.log('sss');
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
        return await res.json();
      }
    });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const removeEvent = createAsyncThunk(
  'remove-modal',
  async (action: { id: string }, { rejectWithValue }) => {
    const { id } = action;
    try {
      const data = await fetch(createUrl(EVENT_URL, id), {
        method: DELETE,
        headers: headers,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          return {
            id,
          };
        }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateEvent = createAsyncThunk(
  'update-event',
  async (action: EventType, { rejectWithValue }) => {
    const { id } = action;
    try {
      const data = await fetch(createUrl(EVENT_URL, id), {
        method: PUT,
        headers: headers,
        body: JSON.stringify(action),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          return await res.json();
        }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
