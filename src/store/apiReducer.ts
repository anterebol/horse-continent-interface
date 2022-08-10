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
    removeModal: (state) => {
      state.reqBody = {};
      state.pass = '';
      state.operationId = '';
      state.modal = '';
    },
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      const userData = jwtDecode(token) as { login: string; role: string };
      state.userData = { ...userData };
      localStorage.setItem('token', token);
      localStorage.setItem('login', userData.login);
      localStorage.setItem('role', userData.role);
      state.loaded = true;
    },
    [signIn.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
      localStorage.setItem('login', '');
      localStorage.setItem('role', '');
    },
    [getUsers.fulfilled.type]: (state, action: { payload: UserType[] }) => {
      state.users = [...action.payload];
      state.loaded = true;
    },
    [getUsers.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
      localStorage.setItem('login', '');
      localStorage.setItem('role', '');
    },
    [addUser.fulfilled.type]: (state, action) => {
      state.users.push(action.payload);
      state.loaded = true;
    },
    [addUser.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
      localStorage.setItem('login', '');
      localStorage.setItem('role', '');
    },
    [updateUser.fulfilled.type]: (state, action) => {
      if (action.payload.id) {
        state.users[state.users.findIndex((user) => user.id === action.payload.id)] = {
          ...action.payload,
        };
        state.reqBody = {};
        state.pass = '';
        state.operationId = '';
        state.modal = '';
        state.loaded = true;
      }
    },
    [updateUser.rejected.type]: (state) => {
      state.loaded = true;
      localStorage.setItem('token', '');
      localStorage.setItem('login', '');
      localStorage.setItem('role', '');
    },
    [removeUser.fulfilled.type]: (state, action) => {
      if (action.payload.id) {
        state.users.splice(
          state.users.findIndex((user) => user.id === action.payload.id),
          1
        );
        state.reqBody = {};
        state.pass = '';
        state.operationId = '';
        state.modal = '';
        state.loaded = true;
      }
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
export const { addToken, openModal, updatePass, sendReqest, addOperationId, removeModal } =
  apiReducer.actions;
