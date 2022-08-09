import { UserItem } from '../UserItem/UserItem';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './listUsers.css';

export const ListUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loaded } = useAppSelector((state) => state.apiReducer);
  return (
    <ul className="user-list">
      {users.map((user) => (
        <UserItem key={user['id']} user={user} />
      ))}
    </ul>
  );
};
