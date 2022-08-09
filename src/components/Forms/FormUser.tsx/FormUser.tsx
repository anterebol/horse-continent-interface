import { useState } from 'react';
import { ACTIVATE_BUTTON, BACK_INPUT, BOX_INPUT, FIELD_INPUT } from '../../../constants/classes';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { signIn } from '../../../store/signApi/signApi';
import { FieldForm } from '../../FieldForm/FieldForm';
import { ParagraphUser } from '../../UserItem/ParagraphUser/ParagraphUser';
import './formUser.css';

const pUser = 'p-user';
export const FormUser = (props: {
  clsInput: string[];
  idFor: string;
  login?: string;
  password?: string;
  name?: string;
  role?: string;
  naming?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.apiReducer);
  const { clsInput, naming, role, idFor } = props;
  const [login, setLogin] = useState(props.login || '');
  const [name, setName] = useState(props.name || '');
  const [password, setPassword] = useState(props.password || '');
  const submit = async (e) => {
    e.preventDefault();
    if (!!name && !!login && !password) {
    }
    // await dispatch(signIn({ login, password }));
    console.log(name, login, password);
    if (!naming) {
      e.target.reset();
      setLogin('');
      setPassword('');
      setName('');
      setPassword('');
    }
  };
  return (
    <>
      <form id={idFor} className={['user-form', clsInput].join(' ')} onSubmit={submit}>
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
          fieldMin={7}
          value={login}
          naming={naming}
        />
        <FieldForm
          placeholder="Пароль"
          type="password"
          func={setPassword}
          cls={clsInput}
          fieldMax={10}
          fieldMin={4}
          value={password}
          naming={naming}
        />
        {naming ? <ParagraphUser option={'Role'} value={role || ''} /> : null}
        {/* <div className={[BOX_INPUT].join(' ')}>
          <div className={clsSelect.join(' ')}></div>
          <select defaultValue="role" className={[FIELD_INPUT, 'role-select'].join(' ')}>
            <option selected={true} disabled>
              Role
            </option>
            <option value="admin" unselectable="off" title="Администратор">
              Admin
            </option>
            <option title="Владелец" value="owner">
              Owner
            </option>
          </select>
        </div> */}
        {/* <button
          className={clsButton.join(' ')}
          disabled={login === '' || password === '' || name === ''}
        >
          {btnName}
        </button> */}
      </form>
    </>
  );
};
