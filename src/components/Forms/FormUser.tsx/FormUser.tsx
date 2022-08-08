import { useEffect, useState } from 'react';
import { ACTIVATE_BUTTON } from '../../../constants/classes';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { signIn } from '../../../store/signApi/signApi';
import { FieldForm } from '../../FieldForm/FieldForm';
import { isValid } from '../../../utils/validation';
import './formUser.css';

export const FormUser = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.apiReducer);
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
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
      <h1 className="add-title">Создать пользователя</h1>
      <form className="user-form" onSubmit={submit}>
        <FieldForm
          placeholder="Имя"
          type="text"
          func={setName}
          cls={['add-user']}
          fieldMax={10}
          fieldMin={4}
        />
        <FieldForm
          placeholder="Email"
          type="email"
          func={setLogin}
          cls={['add-user']}
          fieldMax={15}
          fieldMin={7}
        />
        <FieldForm
          placeholder="Password"
          type="password"
          func={setPassword}
          cls={['add-user']}
          fieldMax={10}
          fieldMin={4}
        />
        <button
          className={[ACTIVATE_BUTTON, 'add-btn'].join(' ')}
          disabled={login === '' || password === '' || name === ''}
        >
          Создать
        </button>
      </form>
    </>
  );
};
