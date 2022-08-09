import { useState } from 'react';
import { UserType } from '../../types/types';
import { FieldForm } from '../FieldForm/FieldForm';
import { FormUser } from '../Forms/FormUser.tsx/FormUser';
import { BtnUser } from './ButtonUser/BtnUser';
import './userItem.css';

export const UserItem = (props: { user: UserType }) => {
  const [isInput, setIsInput] = useState(false);
  const { name, role, password, id, login } = props.user;
  return (
    <li className="user-box" value={id}>
      <div className="user-back"></div>
      <div className="user-intarface">
        <div className="user-prop">
          <FormUser
            clsInput={['user-input']}
            name={name}
            password={password}
            login={login}
            role={role}
            naming={true}
            idFor={'user-item-id'}
          />
        </div>
        <div className="user-buttons">
          <BtnUser cls={['del']} disabled={role === 'owner'} value="Удалить" func={() => {}} />
          <BtnUser
            type="submit"
            idFor={'user-item-id'}
            cls={['update']}
            value="Изменить"
            func={() => {}}
          />
        </div>
      </div>
    </li>
  );
};
