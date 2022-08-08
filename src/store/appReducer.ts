import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState: { ...initialState },
  reducers: {
    load: (state) => {
      state.loaded = !state.loaded;
    },
  },
});

export default appReducer.reducer;
export const { load } = appReducer.actions;
