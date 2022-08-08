import './login.css';

export const Login = () => {
  return (
    <form className="form">
      <h1 className="login-title">Вход</h1>
      <div className="box-auth-input">
        <div className="back-input"></div>
        <input className="auth-input" placeholder="Login" type="email" />
      </div>
      <div className="box-auth-input">
        <div className="back-input second"></div>
        <input className="auth-input" type="password" placeholder="Password" />
      </div>
      <button className="button-auth">Войти</button>
    </form>
  );
};
