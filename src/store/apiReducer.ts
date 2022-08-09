import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './signApi/signApi';

const apiState = {
  loaded: true,
  token: localStorage.getItem('token'),
  events: [],
  users: [
    {
      id: 1,
      name: 'Aleks',
      role: 'admin',
      password: 'password',
      login: 'login',
    },
  ],
};

const apiReducer = createSlice({
  name: 'apiReducer',
  initialState: { ...apiState },
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem('token') || '';
    },
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      state.loaded = true;
    },
    [signIn.pending.type]: (state) => {
      state.loaded = false;
    },
    [signIn.rejected.type]: (state) => {
      state.loaded = true;
    },
  },
});

export default apiReducer.reducer;
export const { addToken } = apiReducer.actions;
