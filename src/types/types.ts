export type AuthType = {
  login: string;
  password: string;
};
export type UserType = {
  id: string;
  name: string;
  role: string;
  password: string;
  login: string;
};
export type EventType = {
  [key: string]: string | number;
};
