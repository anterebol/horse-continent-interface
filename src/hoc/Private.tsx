import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { AUTH_PATH } from '../constants/pathes';
import { useEffect } from 'react';
import { Modal } from '../components/Modal/Modal';

export const Private = (props: { children: JSX.Element }) => {
  const { children } = props;
  const navigate = useNavigate();
  const { token, modal } = useAppSelector((state) => state.apiReducer);

  useEffect(() => {
    if (!token) {
      navigate(AUTH_PATH);
    }
  }, [token]);

  return (
    <>
      {modal ? <Modal /> : null}
      {children}
    </>
  );
};
