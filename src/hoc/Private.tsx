import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { AUTH_PATH } from '../constants/pathes';

export const Private = (props: { children: JSX.Element }) => {
  const { children } = props;
  const { token } = useAppSelector((state) => state.apiReducer);
  if (!token) {
    return <Navigate to={AUTH_PATH} />;
  }
  return children;
};
