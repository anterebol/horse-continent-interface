import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login/Login';

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);

export default App;
