export type AuthType = {
  login: string;
  password: string;
};
export type UserType = {
  id: number;
  name: string;
  role: string;
  password: string;
  login: string;
};
export type EventType = {
  [key: string]: string | number;
};
