import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const app = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('html') as HTMLElement);
root.render(app());
