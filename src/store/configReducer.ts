import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  appReducer,
  apiReducer,
});
export const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootStore = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
