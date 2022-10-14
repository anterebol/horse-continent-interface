import { createUrl } from './../../utils/createUrl';
import { DELETE, PUT } from './../../constants/methods';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../../constants/headers';
import { GET, POST } from '../../constants/methods';
import { USER_URL } from '../../constants/pathes';

export const addUser = createAsyncThunk('add-user', async (action, { rejectWithValue }) => {
  console.log(action, localStorage.getItem('token'));
  try {
    const data = await fetch(USER_URL, {
      method: POST,
      headers: { ...headers, Authorization: `Bearer ` + localStorage.getItem('token') || '' },
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
export const getUsers = createAsyncThunk('get-users', async (action, { rejectWithValue }) => {
  try {
    const data = await fetch(USER_URL, {
      method: GET,
      headers: {
        ...headers,
        Authorization: `Bearer ` + localStorage.getItem('token') || '',
      },
    }).then(async (res) => {
      if (!res.ok && res.status === 401) {
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
export const removeUser = createAsyncThunk(
  'remove-user',
  async (action: any, { rejectWithValue }) => {
    const { id } = action;
    try {
      const data = await fetch(createUrl(USER_URL, id), {
        method: DELETE,
        headers: { ...headers, Authorization: `Bearer ` + localStorage.getItem('token') || '' },
        body: JSON.stringify(action),
      }).then(async (res) => {
        if (!res.ok && res.status === 401) {
          throw new Error(res.status.toString());
        } else if (!res.ok) {
          return;
        } else {
          return 'deleted correctly';
        }
      });
      if (data) {
        return { id };
      }
      return { id: '' };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateUser = createAsyncThunk(
  'update-user',
  async (action: any, { rejectWithValue }) => {
    const { id } = action;
    try {
      const data = await fetch(createUrl(USER_URL, id), {
        method: PUT,
        headers: { ...headers, Authorization: `Bearer ` + localStorage.getItem('token') || '' },
        body: JSON.stringify(action),
      }).then(async (res) => {
        if (!res.ok && res.status === 401) {
          throw new Error(res.status.toString());
        } else if (res.ok) {
          return await res.text().then((res) => JSON.parse(res));
        } else {
          return;
        }
      });
      if (data) {
        return { ...data, status: 'ok' };
      } else {
        console.log(action);
        return { id: action.id };
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
