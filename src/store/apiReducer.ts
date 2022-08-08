import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './signApi/signApi';

const apiState = {
  loaded: true,
  autorized: localStorage.getItem('jwt') || '',
};

const apiReducer = createSlice({
  name: 'apiReducer',
  initialState: { ...apiState },
  reducers: {},
  extraReducers: {
    [signIn.fulfilled.type]: (state, action) => {
      state.autorized = action.payload;
      localStorage.setItem('jvt', action.payload);
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
