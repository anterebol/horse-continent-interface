import { useState } from 'react';
import { UserType } from '../../types/types';
import { FieldForm } from '../FieldForm/FieldForm';
import { FormUser } from '../Forms/FormUser.tsx/FormUser';
import { BtnUser } from './ParagraphUser/ButtonUser/BtnUser';
import { ParagraphUser } from './ParagraphUser/ParagraphUser';
import './userItem.css';
const inputCls = 'user-input';

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
            clsSelect={[]}
            clsButton={[]}
            name={name}
            password={password}
            login={login}
            role={role}
            btnName={'Изменить'}
            naming={true}
          />
        </div>
        <div className="user-buttons">
          <BtnUser cls={['btn-user', 'del']} value="Удалить" func={() => {}} />
          <BtnUser cls={['btn-user', 'update']} value="Изменить" func={() => {}} />
        </div>
      </div>
    </li>
  );
};
