import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login/Login';
import { Reviews } from './pages/Reviews/Reviews';
import { Events } from './pages/Events/Events';
import { Private } from './hoc/Private';
import { useAppDispatch } from './hooks/hooks';
import { addToken } from './store/apiReducer';
import { useEffect } from 'react';
import { Main } from './pages/Main/Main';
import {
  MAIN_PATH,
  EVENT_PATH,
  REVIEW_PATH,
  USER_PATH,
  AUTH_PATH,
  GALLERY_PATH,
  DEVELOP_PATH,
} from './constants/pathes';
import { Users } from './pages/Users/Users';
import { Gallery } from './pages/Gallery/Gallery';
import { Developer } from './pages/Developer/Developer';

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
        path={EVENT_PATH}
        element={
          <Private>
            <Events />
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
      <Route
        path={GALLERY_PATH}
        element={
          <Private>
            <Gallery />
          </Private>
        }
      />
      <Route path={DEVELOP_PATH} element={<Developer />} />
    </Routes>
  );
};

export default App;
