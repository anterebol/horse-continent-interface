import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { AUTH_PATH } from '../constants/pathes';
import { useEffect } from 'react';
import { Modal } from '../components/Modal/Modal';

export const Private = (props: { children: JSX.Element }) => {
  const { children } = props;
  const { token, modal } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {}, [token]);
  if (!token) {
    return <Navigate to={AUTH_PATH} />;
  }
  return (
    <>
      {modal ? <Modal /> : null}
      {children}
    </>
  );
};
