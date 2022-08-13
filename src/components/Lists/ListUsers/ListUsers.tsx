import { UserItem } from './UserItem/UserItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import './listUsers.css';
import { useEffect } from 'react';
import { getUsers } from '../../../store/userApi/userApi';
import spinner from '../../../assets/spinner.gif';
import { Preloader } from '../../Preloader/Preloader';

export const ListUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loaded } = useAppSelector((state) => state.apiReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      {loaded ? (
        <ul className="user-list">
          {users
            .filter((user) => user.role === 'owner')
            .map((user) => (
              <UserItem key={user['id']} user={user} />
            ))}
          {users
            .filter((user) => user.role === 'admin')
            .map((user) => (
              <UserItem key={user['id']} user={user} />
            ))}
        </ul>
      ) : (
        <Preloader />
      )}
    </>
  );
};
