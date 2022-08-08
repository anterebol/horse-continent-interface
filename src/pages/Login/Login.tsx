import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { signIn } from '../../store/signApi/signApi';
import './login.css';

export const Login = () => {
  const dispatch = useAppDispatch();
  const { loaded } = useAppSelector((state) => state.appReducer);
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
    <form className="form" onSubmit={submit}>
      <h1 className="login-title">Вход</h1>
      <div className="box-auth-input">
        <div className="back-input"></div>
        <input
          className="auth-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="box-auth-input">
        <div className="back-input second"></div>
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button-auth" disabled={login === '' || password === ''}>
        Войти
      </button>
    </form>
  );
};
