import { createUrl } from '../utils/createUrl';
// export const URL = 'https://horse-continent.herokuapp.com';
export const URL = 'http://localhost:4000';

export const AUTH_PATH = '/sign-in';
export const MAIN_PATH = '';
export const EVENT_PATH = '/event';
export const REVIEW_PATH = '/review';
export const USER_PATH = '/user';
export const DEVELOP_PATH = '/developer';
export const GALLERY_PATH = '/gallery';

export const USER_POINT = 'user';
export const AUTH_POINT = 'auth';
export const EVENT_POINT = 'event';
export const GALLERY_POINT = 'gallery';
export const REVIEW_POINT = 'review';

export const AUTH_URL = createUrl(URL, AUTH_POINT);
export const USER_URL = createUrl(URL, USER_POINT);
export const EVENT_URL = createUrl(URL, EVENT_POINT);
export const MAIN_URL = createUrl(URL, '');
export const GALLERY_URL = createUrl(URL, GALLERY_POINT);
export const REVIEW_URL = createUrl(URL, REVIEW_POINT);
