import { UserItem } from './UserItem/UserItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import './listUsers.css';
import { useEffect, useState } from 'react';
import { getUsers } from '../../../store/userApi/userApi';
import spinner from '../../../assets/spinner.gif';
import { Preloader } from '../../Preloader/Preloader';

export const ListUsers = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.apiReducer);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(getUsers()).then(() => setLoaded(true));
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
