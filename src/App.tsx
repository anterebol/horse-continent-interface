import { Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login/Login';
import { Reviews } from './pages/Reviews/Reviews';
import { Service } from './pages/Service/Service';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/sign-in" />} />
    <Route path="/sign-in" element={<Login />} />
    <Route path="/service" element={<Service />} />
    <Route path="/reviews" element={<Reviews />} />
  </Routes>
);

export default App;
