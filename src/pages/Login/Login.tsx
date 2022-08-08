import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { signIn } from '../../store/signApi/signApi';
import { DEVELOP_PATH } from '../../constants/pathes';
import { ACTIVATE_BUTTON } from '../../constants/classes';
import './login.css';
import { NavLink } from 'react-router-dom';
import { FieldForm } from '../../components/FieldForm/FieldForm';

export const Login = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.apiReducer);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    await dispatch(signIn({ login, password }));
    e.target.reset();
    setLogin('');
    setPassword('');
  };

  return (
    <>
      {!token ? (
        <>
          <form className="form" onSubmit={submit}>
            <h1 className="login-title">Вход</h1>
            <FieldForm
              placeholder="Email"
              type="email"
              func={setLogin}
              cls={['sign-field']}
              fieldMax={15}
              fieldMin={7}
            />
            <FieldForm
              placeholder="Password"
              type="password"
              func={setPassword}
              cls={['sign-field']}
              fieldMax={10}
              fieldMin={4}
            />
            <button className={ACTIVATE_BUTTON} disabled={login === '' || password === ''}>
              Войти
            </button>
          </form>
          <NavLink to={DEVELOP_PATH}>
            <div className="back-dev"></div>
            <p className="develop-link">Связаться с разработчиком</p>
          </NavLink>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
