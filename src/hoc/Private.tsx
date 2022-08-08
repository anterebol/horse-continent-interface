import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { SIGN_IN_PATH } from '../constants/pathes';

export const Private = (props: { children: JSX.Element }) => {
  const { children } = props;
  const { token } = useAppSelector((state) => state.apiReducer);
  if (!token) {
    return <Navigate to={SIGN_IN_PATH} />;
  }
  return children;
};
