import inst from '../../assets/contacts/instagram.svg';
import telegram from '../../assets/contacts/telegram.svg';
import git from '../../assets/contacts/github.svg';
import vk from '../../assets/contacts/vk.svg';
import './developer.css';
import { AUTH_PATH } from '../../constants/pathes';
import { NavLink } from 'react-router-dom';

export const Developer = () => {
  return (
    <div className="developer-page">
      <div className="developer-box">
        <a
          className="developer-link"
          href="https://www.instagram.com/alex_festern/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={inst} alt="" />
        </a>
        <a
          className="developer-link"
          href="https://t.me/anterebol"
          target="_blank"
          rel="noreferrer"
        >
          <img src={telegram} alt="" />
        </a>
        <a
          className="developer-link"
          href="https://github.com/anterebol"
          target="_blank"
          rel="noreferrer"
        >
          <img src={git} alt="" />
        </a>
        <a
          className="developer-link"
          href="https://vk.com/aleksey_festern"
          target="_blank"
          rel="noreferrer"
        >
          <img src={vk} alt="" />
        </a>
      </div>
      <NavLink to={AUTH_PATH}>
        <p className="develop-link">Вернуться</p>
      </NavLink>
    </div>
  );
};
