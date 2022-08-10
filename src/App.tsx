import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login/Login';
import { Reviews } from './pages/Reviews/Reviews';
import { Service } from './pages/Service/Service';
import { Private } from './hoc/Private';
import { useAppDispatch } from './hooks/hooks';
import { addToken } from './store/apiReducer';
import { useEffect } from 'react';
import { Main } from './pages/Main/Main';
import { MAIN_PATH, SERVICE_PATH, REVIEW_PATH, USER_PATH, AUTH_PATH } from './constants/pathes';
import { Users } from './pages/Users/Users';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addToken());
  }, []);
  return (
    <Routes>
      <Route path={AUTH_PATH} element={<Login />} />
      <Route
        path={MAIN_PATH}
        element={
          <Private>
            <Main />
          </Private>
        }
      />
      <Route
        path={SERVICE_PATH}
        element={
          <Private>
            <Service />
          </Private>
        }
      />
      <Route
        path={REVIEW_PATH}
        element={
          <Private>
            <Reviews />
          </Private>
        }
      />
      <Route
        path={USER_PATH}
        element={
          <Private>
            <Users />
          </Private>
        }
      />
    </Routes>
  );
};

export default App;
