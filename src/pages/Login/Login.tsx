import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { signIn } from '../../store/signApi/signApi';
import { DEVELOP_PATH } from '../../constants/pathes';
import { ACTIVATE_BUTTON } from '../../constants/classes';
import './login.css';
import { NavLink } from 'react-router-dom';
import { FieldForm } from '../../components/Forms/FieldForm/FieldForm';

export const Login = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.apiReducer);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    e.target.reset();
    await dispatch(signIn({ login, password }));
    setLogin('');
    setPassword('');
  };

  return (
    <>
      {!token ? (
        <>
          <form className="form login" onSubmit={submit}>
            <h1 className="login-title">Вход</h1>
            <FieldForm
              placeholder="Логин"
              type="text"
              func={setLogin}
              cls={['sign-field']}
              fieldMax={15}
              fieldMin={5}
            />
            <FieldForm
              placeholder="Пароль"
              type="password"
              func={setPassword}
              cls={['sign-field']}
              fieldMax={15}
              fieldMin={4}
            />
            <button className={ACTIVATE_BUTTON} disabled={login === '' || password === ''}>
              Войти
            </button>
          </form>
          <NavLink to={DEVELOP_PATH}>
            <p className="develop-link">Связаться с разработчиком</p>
          </NavLink>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
