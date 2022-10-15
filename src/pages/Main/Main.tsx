import { NavLink } from 'react-router-dom';
import { ACTIVATE_BUTTON } from '../../constants/classes';
import { REVIEW_PATH, EVENT_PATH, USER_PATH, GALLERY_PATH } from '../../constants/pathes';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import spinner from '../../assets/spinner.gif';
import './main.css';
import { useEffect } from 'react';
import { mainApi } from '../../store/mainApi/mainApi';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { userData, loaded, reviewPage } = useAppSelector((state) => state.apiReducer);

  useEffect(() => {
    dispatch(mainApi());
  }, []);
  return (
    <>
      {loaded ? (
        <div className="main">
          <NavLink to={EVENT_PATH}>
            <button className={ACTIVATE_BUTTON}>Сервис</button>
          </NavLink>
          {userData.role === 'owner' || localStorage.getItem('role') === 'owner' ? (
            <NavLink to={USER_PATH}>
              <button className={ACTIVATE_BUTTON}>Пользователи</button>
            </NavLink>
          ) : null}
          <NavLink to={REVIEW_PATH + '/' + reviewPage}>
            <button className={ACTIVATE_BUTTON}>Отзывы</button>
          </NavLink>
          <NavLink to={GALLERY_PATH}>
            <button className={ACTIVATE_BUTTON}>Галерея</button>
          </NavLink>
        </div>
      ) : (
        <img className="loader-main" src={spinner}></img>
      )}
    </>
  );
};
