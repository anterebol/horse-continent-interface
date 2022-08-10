import { createUrl } from '../utils/createUrl';
// export const URL = 'https://horse-continent.herokuapp.com';
export const URL = 'http://localhost:4000';

export const AUTH_PATH = '/sign-in';
export const MAIN_PATH = '';
export const SERVICE_PATH = '/service';
export const REVIEW_PATH = '/review';
export const USER_PATH = '/user';
export const DEVELOP_PATH = '/develop';

export const USER_POINT = 'user';
export const AUTH_POINT = 'auth';

export const AUTH_URL = createUrl(URL, AUTH_POINT);
export const USER_URL = createUrl(URL, USER_POINT);
