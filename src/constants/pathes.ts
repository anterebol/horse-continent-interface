import { createUrl } from '../utils/createUrl';
// export const URL = 'https://horse-continent.herokuapp.com';
export const URL = 'http://localhost:4000';
export const AUTH_POINT = 'auth';
export const AUTH_URL = createUrl(URL, AUTH_POINT);
export const pathes = {
  login: '/',
};
