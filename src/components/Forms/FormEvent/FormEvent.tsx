import './formEvent.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { sendReqest } from '../../../store/apiReducer';
import { FieldForm } from '../FieldForm/FieldForm';
import { ParagraphUser } from '../../Lists/ListUsers/ParagraphUser/ParagraphUser';

export const FormEvent = (props: {
  clsInput: string[];
  idFor: string;
  login?: string;
  password?: string;
  name?: string;
  role?: string;
  naming?: boolean;
  submit?: any;
}) => {
  const dispatch = useAppDispatch();
  const { token, modal } = useAppSelector((state) => state.apiReducer);
  const { clsInput, naming, role, idFor, submit } = props;
  const [login, setLogin] = useState(props.login || '');
  const [name, setName] = useState(props.name || '');
  const [password, setPassword] = useState(props.password || '');
  const submitForm = async (e) => {
    e.preventDefault();
    if (modal && !submit) {
      dispatch(sendReqest({ reqBody: { login, name, password } }));
      setPassword('');
    } else if (submit) {
      await dispatch(submit({ login, name, password }));
    }

    if (!naming) {
      e.target.reset();
      setLogin('');
      setPassword('');
      setName('');
    }
  };
  return (
    <>
      <form id={idFor} className={['user-form', clsInput].join(' ')} onSubmit={submitForm}>
        <FieldForm
          placeholder="Имя"
          type="text"
          func={setName}
          cls={clsInput}
          fieldMax={10}
          fieldMin={4}
          value={name}
          naming={naming}
        />
        <FieldForm
          placeholder="Логин"
          type="text"
          func={setLogin}
          cls={clsInput}
          fieldMax={15}
          fieldMin={5}
          value={login}
          naming={naming}
        />
        <FieldForm
          placeholder="Пароль"
          type="text"
          func={setPassword}
          cls={clsInput}
          fieldMax={10}
          fieldMin={4}
          value={password}
          naming={naming}
        />
        {naming ? <ParagraphUser option={'Role'} value={role || ''} /> : null}
      </form>
    </>
  );
};
