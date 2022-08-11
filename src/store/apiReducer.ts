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
  events: [
    {
      id: '1123',
      name: 'name',
      date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
      img: 'https://benzin.io/wp-content/uploads/2020/09/test-img.jpg',
      description: `Stack Overflow на русском — это сайт вопросов и ответов для программистов. Присоединяйтесь! Регистрация займёт не больше минуты.


      Любой может задать вопрос
      
      Любой может ответить
      
      Лучшие ответы получают голоса и поднимаются наверх
      Главная
      ПУБЛИЧНЫЕ
      Вопросы
      Метки
      Участники
      Неотвеченные
      Как убрать обводку при клике на input
      Вопрос задан 11 лет 3 месяца назад
      Изменён 1 месяц назад
      Просмотрен 204k раза
      
      17
      
      
      3
      При клике и фокусе на элементе input появляется обводка. Как её убрать?
      
      html
      css
      вёрстка
      input
      Поделиться
      Улучшить вопрос
      Отслеживать
      изменён 14 июн в 7:47
      user avatar
      MobiDevices
      7,08055 золотых знаков2626 серебряных знаков6565 бронзовых знаков
      задан 20 апр 2011 в 11:14
      user avatar
      makregistr
      3,18144 золотых знака1818 серебряных знаков2525 бронзовых знаков
      Кинь ссылку посмотреть на страничку – 
      AHXAOC
       20 апр 2011 в 12:35
      Ваша ссылка на изображение устарела, можете обновить? – 
      4per
       19 окт 2016 в 2:06
      focus-visible - рекомендую ознакомиться youtube.com/watch?v=EHg7DeciuW8 – 
      muturgan
       26 июн 2021 в 18:02 
      Добавить комментарий
      10 ответов
      Сортировка:
      
      Наивысший рейтинг (по умолчанию)
      
      40
      
      input {outline:none;}
      Этот же приём убирает обводку пунктиром вокруг нажатой ссылки и вокруг любого из элементов формы.
      
      Поделиться
      Улучшить ответ
      Отслеживать
      изменён 8 июн 2020 в 13:42
      user avatar
      MobiDevices
      7,08055 золотых знаков2626 серебряных знаков6565 бронзовых знаков
      ответ дан 25 мая 2011 в 20:44
      user avatar
      Ведрусс
      61855 серебряных знаков99 бронзовых знаков
      {outline:none;} не работает в ие6-7 – 
      makregistr
       30 мая 2011 в 8:15
      1
      outline: none; border: none; – 
      Sh4dow
       15 июн 2011 в 15:07
      Добавить комментарий
      
      19
      
      Универсальное решение, которое убирает подсветку во всех браузерах и не только на input, но и на других элементах, в том числе select, button, a:
      
      /* Remove outline on the forms and links */
      :active, :hover, :focus {
          outline: 0;`,
      visible: true,
      was: false,
    },
  ],
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
    [removeUser.rejected.type]: (state, action) => {
      console.log(action);
      // state.loaded = true;
      // localStorage.setItem('token', '');
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
