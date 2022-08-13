import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { UserModal } from './userModal/UserModal';
import { removeUser, updateUser } from '../../store/userApi/userApi';
import './modal.css';
import {
  DEL_EVENT_MODAL,
  DEL_USER_MODAL,
  UP_EVENT_MODAL,
  UP_USER_MODAL,
} from '../../constants/modals';
import { removeModal } from '../../store/apiReducer';
import close from '../../assets/close.svg';
import closeOrange from '../../assets/close-orange.svg';
import { removeEvent } from '../../store/eventApi/eventApi';
import { Button } from '../Button/Button';
import { FormEvent } from '../Forms/FormEvent/FormEvent';
import { EventModal } from './EventModal/EventModal';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);
  const { modal, reqBody, userData, operationId } = useAppSelector((state) => state.apiReducer);
  const [pass, setPass] = useState('');
  const checkModal = (modalType) => {
    switch (true) {
      case modalType === DEL_USER_MODAL || modalType === UP_USER_MODAL:
        return <UserModal submit={submit} setPass={setPass} modal={modal} pass={pass} />;
      case modalType === DEL_EVENT_MODAL:
        return (
          <div>
            <h3>Нажмите подтвердить для удаления</h3>
            <Button value={'Удалить'} cls={['del']} disabled={false} func={submit} />
          </div>
        );
      case modalType === UP_EVENT_MODAL:
        return <EventModal />;
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    switch (true) {
      case modal === DEL_USER_MODAL:
        await dispatch(
          removeUser({
            id: operationId,
            currentPassword: pass,
            currentLogin: userData.login || localStorage.getItem('login'),
          })
        );
        break;
      case modal === UP_USER_MODAL:
        await dispatch(
          updateUser({
            id: operationId,
            ...reqBody,
            currentPassword: pass,
            currentLogin: userData.login || localStorage.getItem('login'),
          })
        );
        break;
      case modal === DEL_EVENT_MODAL:
        dispatch(
          removeEvent({
            id: operationId,
          })
        );
        break;
    }
    closeModal();
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
        {checkModal(modal)}
      </div>
    </div>
  );
};
