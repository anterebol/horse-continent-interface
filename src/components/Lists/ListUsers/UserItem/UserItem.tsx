import { UserType } from '../../../../types/types';
import { FormUser } from '../../../Forms/FormUser.tsx/FormUser';
import { Button } from '../../../Button/Button';
import './userItem.css';
import { useAppDispatch } from '../../../../hooks/hooks';
import { addOperationId, openModal } from '../../../../store/apiReducer';
import { DEL_USER_MODAL, UP_USER_MODAL } from '../../../../constants/modals';

export const UserItem = (props: { user: UserType }) => {
  const dispatch = useAppDispatch();
  const { name, role, password, id, login } = props.user;

  const removeUser = () => {
    dispatch(openModal(DEL_USER_MODAL));
    dispatch(addOperationId(id));
  };
  const updateUser = () => {
    console.log('x');
    dispatch(openModal(UP_USER_MODAL));
    dispatch(addOperationId(id));
  };

  return (
    <li className="user-box" id={id}>
      <div className="user-back"></div>
      <div className="user-intarface">
        <div className="user-prop">
          <FormUser
            // submit={updateUser}
            clsInput={['user-input']}
            name={name}
            password={password}
            login={login}
            role={role}
            naming={true}
            idFor={`user-item-${id}`}
          />
        </div>
        <div className="user-buttons">
          <Button cls={['del']} disabled={role === 'owner'} value="Удалить" func={removeUser} />
          <Button
            type="submit"
            idFor={`user-item-${id}`}
            cls={['update']}
            value="Изменить"
            func={updateUser}
          />
        </div>
      </div>
    </li>
  );
};
