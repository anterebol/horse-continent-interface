import { UserType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './signApi/signApi';
import { addUser, getUsers, removeUser, updateUser } from './userApi/userApi';
import jwtDecode from 'jwt-decode';

const apiState = {
  loaded: true,
  token: localStorage.getItem('token'),
  modal: '',
  pass: '',
  userData: { login: '', role: '' },
  reqBody: {},
  events: [],
  users: [] as UserType[],
  operationId: '',
};

const apiReducer = createSlice({
  name: 'apiReducer',
  initialState: { ...apiState },
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem('token') || '';
    },
    openModal: (state, action) => {
      state.modal = action.payload;
    },
    sendReqest: (state, action) => {
      state.reqBody = action.payload.reqBody;
    },
    updatePass: (state, action) => {
      state.pass = action.payload;
    },
    addOperationId: (state, action) => {
      state.operationId = action.payload;
    },
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem('token', token);
      // console.log(token);
      state.userData = jwtDecode(token);
      state.loaded = true;
    },
    [signIn.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
    },
    [getUsers.fulfilled.type]: (state, action: { payload: UserType[] }) => {
      state.users = [...action.payload];
      state.loaded = true;
    },
    [getUsers.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
    },
    [addUser.fulfilled.type]: (state, action) => {
      state.users.push(action.payload);
      state.loaded = true;
    },
    [addUser.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
    },
    [updateUser.fulfilled.type]: (state, action) => {
      state.users[state.users.findIndex((user) => user.id === action.payload.id)] = {
        ...action.payload,
      };
      state.loaded = true;
    },
    [updateUser.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
    },
    [removeUser.fulfilled.type]: (state, action) => {
      state.users.splice(
        state.users.findIndex((user) => user.id === action.payload.id),
        1
      );
      state.loaded = true;
    },
    [removeUser.rejected.type]: (state) => {
      console.log(removeUser.rejected);
      state.loaded = true;
      localStorage.setItem('token', '');
    },
    [getUsers.pending.type ||
    signIn.pending.type ||
    addUser.pending.type ||
    removeUser.pending.type]: (state) => {
      state.loaded = false;
    },
  },
});

export default apiReducer.reducer;
export const { addToken, openModal, updatePass, sendReqest, addOperationId } = apiReducer.actions;
