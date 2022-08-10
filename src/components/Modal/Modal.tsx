import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { FieldForm } from '../FieldForm/FieldForm';
import { BtnUser } from '../UserItem/ButtonUser/BtnUser';
import { removeUser, updateUser } from '../../store/userApi/userApi';
import './modal.css';
import { delModal, updateModal } from '../../constants/modals';
import { openModal } from '../../store/apiReducer';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const { modal, reqBody, userData, operationId } = useAppSelector((state) => state.apiReducer);
  const [pass, setPass] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (modal === delModal) {
      console.log('remove', {
        id: operationId,
        currentPassword: pass,
        currentLogin: userData.login || '',
      });
      await dispatch(
        removeUser({ id: operationId, currentPassword: pass, currentLogin: userData.login || '' })
      );
      dispatch(openModal(''));
    } else if (modal === updateModal) {
      console.log('up', {
        id: operationId,
        ...reqBody,
        currentPassword: pass,
        currentLogin: userData.login || '',
      });
      await dispatch(
        updateUser({
          id: operationId,
          ...reqBody,
          currentPassword: pass,
          currentLogin: userData.login || '',
        })
      );
      dispatch(openModal(''));
    }
  };
  return (
    <div className="modal-box">
      <div className="modal-back"></div>
      <div className="modal-body">
        <h2 className="modal-title">Введите пароль для подтверждения</h2>
        <form onSubmit={submit}>
          <FieldForm
            placeholder={'Пароль'}
            type={'password'}
            func={setPass}
            fieldMin={4}
            fieldMax={15}
          />
          {modal === 'delete-modal' ? (
            <BtnUser
              type="submit"
              cls={['del']}
              disabled={pass.length < 4 || pass.length > 15 ? true : false}
              value="Удалить"
              func={() => {}}
            />
          ) : (
            <BtnUser
              type="submit"
              // idFor={'user-item-id'}
              disabled={pass.length < 4 || pass.length > 15 ? true : false}
              cls={['update']}
              value="Изменить"
              func={() => {}}
            />
          )}
        </form>
      </div>
    </div>
  );
};
