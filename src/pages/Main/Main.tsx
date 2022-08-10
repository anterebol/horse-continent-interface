import { NavLink } from 'react-router-dom';
import { ACTIVATE_BUTTON } from '../../constants/classes';
import { REVIEW_PATH, SERVICE_PATH, USER_PATH } from '../../constants/pathes';
import { useAppSelector } from '../../hooks/hooks';
import './main.css';

export const Main = () => {
  const { userData } = useAppSelector((state) => state.apiReducer);
  return (
    <div className="main">
      <NavLink to={SERVICE_PATH}>
        <button className={ACTIVATE_BUTTON}>Сервис</button>
      </NavLink>
      {userData.role === 'owner' ? (
        <NavLink to={USER_PATH}>
          <button className={ACTIVATE_BUTTON}>Пользователи</button>
        </NavLink>
      ) : null}
      <NavLink to={REVIEW_PATH}>
        <button className={ACTIVATE_BUTTON}>Отзывы</button>
      </NavLink>
    </div>
  );
};
