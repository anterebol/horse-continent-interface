import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { FieldForm } from '../Forms/FieldForm/FieldForm';
import { Button } from '../Button/Button';
import { removeUser, updateUser } from '../../store/userApi/userApi';
import './modal.css';
import { delModal, updateModal } from '../../constants/modals';
import { openModal, removeModal } from '../../store/apiReducer';
import close from '../../assets/close.svg';
import closeOrange from '../../assets/close-orange.svg';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);
  const { modal, reqBody, userData, operationId } = useAppSelector((state) => state.apiReducer);
  const [pass, setPass] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (modal === delModal) {
      await dispatch(
        removeUser({
          id: operationId,
          currentPassword: pass,
          currentLogin: userData.login || localStorage.getItem('login'),
        })
      );
      dispatch(openModal(''));
    } else if (modal === updateModal) {
      await dispatch(
        updateUser({
          id: operationId,
          ...reqBody,
          currentPassword: pass,
          currentLogin: userData.login || localStorage.getItem('login'),
        })
      );
      dispatch(openModal(''));
    }
  };
  const closeModal = () => {
    dispatch(removeModal());
  };

  return (
    <div className={['modal-box', modal ? 'open' : ''].join(' ')} onClick={closeModal}>
      <div className={['modal-back', modal ? 'open' : ''].join(' ')}></div>
      <div
        className="modal-body"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="close">
          <img
            src={!hovered ? close : closeOrange}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => closeModal()}
            alt=""
          />
        </div>
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
            <Button
              type="submit"
              cls={['del']}
              disabled={pass.length < 4 || pass.length > 15 ? true : false}
              value="Удалить"
              func={() => {}}
            />
          ) : (
            <Button
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
