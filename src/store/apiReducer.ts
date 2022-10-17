import { getEvents, addEvent, removeEvent, updateEvent } from './eventApi/eventApi';
import { EventType, ReviewType, UserType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './signApi/signApi';
import { addUser, getUsers, removeUser, updateUser } from './userApi/userApi';
import jwtDecode from 'jwt-decode';
import { mainApi } from './mainApi/mainApi';
import { addImage, getGallery, removeGalleryImage } from './galleryApi/galleryApi';
import { getReview, getReviewPages, removeReview } from './reviewApi/reviewApi';

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
  gallery: [] as Array<{ id: string; src: string }>,
  reviews: [] as Array<ReviewType>,
  reviewPage: '1',
  maxCountReviewPages: '1',
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
    chengeReviewPage: (state, action) => {
      state.reviewPage = action.payload;
    },
    closeApp: (state) => {
      state.token = '';
      removeStorage();
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
      state.token = '';
      removeStorage();
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
    [signIn.pending.type]: (state) => {
      state.loaded = false;
    },
    [signIn.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
    [getUsers.fulfilled.type]: (state, action: { payload: UserType[] }) => {
      state.users = [...action.payload];
      state.loaded = true;
    },
    [getUsers.pending.type]: (state) => {
      state.loaded = false;
    },
    [getUsers.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
    [addUser.fulfilled.type]: (state, action) => {
      state.users.push(action.payload);
    },
    [addUser.rejected.type]: (state) => {
      state.token = '';
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
    },
    [updateUser.rejected.type]: (state) => {
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
      }
    },
    [removeUser.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
      state.operationId = '';
    },
    [getEvents.fulfilled.type]: (state, action) => {
      action.payload.sort((a, b) => a.order - b.order);
      state.events = [...action.payload];
      state.loaded = true;
    },
    [getEvents.pending.type]: (state) => {
      state.loaded = false;
    },
    [getEvents.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
    [addEvent.fulfilled.type]: (state, action) => {
      state.events.push(action.payload);
    },
    [addEvent.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
    [updateEvent.fulfilled.type]: (state, action) => {
      if (action.payload.id) {
        const index = state.events.findIndex((event) => event.id === action.payload.id);
        state.events[index] = { ...action.payload };
      }
      state.operationId = '';
      state.modal = '';
    },
    [updateEvent.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
    [removeEvent.fulfilled.type]: (state, action) => {
      state.events.splice(
        state.events.findIndex((event) => event.id === action.payload.id),
        1
      );
    },
    [removeEvent.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
    [getGallery.fulfilled.type]: (state, action) => {
      state.gallery = [...action.payload];
      state.loaded = true;
    },
    [getGallery.pending.type]: (state) => {
      state.loaded = false;
    },
    [getGallery.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
    [addImage.fulfilled.type]: (state, action) => {
      state.gallery.unshift(action.payload);
    },
    [addImage.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
    [removeGalleryImage.fulfilled.type]: (state, action) => {
      const id = action.payload;
      state.gallery.splice(
        state.gallery.findIndex((image) => image.id === id),
        1
      );
    },
    [removeGalleryImage.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
    [getReview.fulfilled.type]: (state, action) => {
      state.reviews = [...action.payload];
      state.loaded = true;
    },
    [getReview.pending.type]: (state) => {
      state.loaded = false;
    },
    [getReview.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
      state.loaded = true;
    },
    [getReviewPages.fulfilled.type]: (state, action) => {
      state.maxCountReviewPages = action.payload;
    },
    [getReviewPages.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
    [removeReview.fulfilled.type]: (state, action) => {
      state.reviews.splice(
        state.reviews.findIndex((review) => review.id === action.payload),
        1
      );
    },
    [removeReview.rejected.type]: (state) => {
      state.token = '';
      removeStorage();
    },
  },
});

export default apiReducer.reducer;
export const {
  addToken,
  openModal,
  updatePass,
  sendReqest,
  addOperationId,
  removeModal,
  chengeReviewPage,
  closeApp,
} = apiReducer.actions;
