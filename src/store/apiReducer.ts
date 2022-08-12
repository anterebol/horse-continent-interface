import { getEvents, addEvent } from './eventApi/eventApi';
import { EventType, UserType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './signApi/signApi';
import { addUser, getUsers, removeUser, updateUser } from './userApi/userApi';
import jwtDecode from 'jwt-decode';
import { mainApi } from './mainApi/mainApi';

const removeStorage = () => {
  localStorage.setItem('token', '');
  localStorage.setItem('login', '');
  localStorage.setItem('role', '');
};
const apiState = {
  loaded: true,
  token: localStorage.getItem('token'),
  modal: '',
  pass: '',
  userData: { login: '', role: '' },
  reqBody: {},
  events: [] as EventType[],
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
    [mainApi.fulfilled.type]: (state) => {
      state.loaded = true;
    },
    [mainApi.pending.type]: (state) => {
      state.loaded = false;
    },
    [mainApi.rejected.type]: (state) => {
      console.log('sss');
      state.token = '';
      localStorage.setItem('token', '');
      state.loaded = true;
    },
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
      removeStorage();
    },
    [getUsers.fulfilled.type]: (state, action: { payload: UserType[] }) => {
      state.users = [...action.payload];
      state.loaded = true;
    },
    [getUsers.rejected.type]: (state) => {
      state.loaded = true;
      removeStorage();
    },
    [addUser.fulfilled.type]: (state, action) => {
      state.users.push(action.payload);
      state.loaded = true;
    },
    [addUser.rejected.type]: (state) => {
      state.loaded = true;
      removeStorage();
    },
    [updateUser.fulfilled.type]: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (action.payload.status) {
        state.users[index] = {
          ...action.payload,
        };
      }
      state.reqBody = {};
      state.pass = '';
      state.operationId = '';
      state.modal = '';
      state.loaded = true;
    },
    [updateUser.rejected.type]: (state, action) => {
      console.log(action.payload);
      state.loaded = true;
      state.token = '';
      removeStorage();
      state.reqBody = {};
      state.pass = '';
      state.operationId = '';
      state.modal = '';
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
      state.loaded = true;
      localStorage.setItem('token', '');
      state.token = '';
      state.operationId = '';
    },
    [getUsers.pending.type ||
    signIn.pending.type ||
    addUser.pending.type ||
    removeUser.pending.type]: (state) => {
      state.loaded = false;
    },
    [getEvents.fulfilled.type]: (state, action) => {
      console.log(action);
      state.events = [...action.payload];
      state.loaded = true;
    },
    [getEvents.pending.type]: (state, action) => {
      state.loaded = false;
    },
    [getEvents.rejected.type]: (state, action) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
    [addEvent.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      state.events.push(action.payload);
      state.loaded = true;
    },
    [addEvent.pending.type]: (state, action) => {
      state.loaded = false;
    },
    [addEvent.rejected.type]: (state, action) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
  },
});

export default apiReducer.reducer;
export const { addToken, openModal, updatePass, sendReqest, addOperationId, removeModal } =
  apiReducer.actions;
