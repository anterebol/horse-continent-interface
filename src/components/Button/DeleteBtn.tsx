import { useState } from 'react';
import './deleteBtn.css';
import close from '../../assets/close-white.svg';
import closeOrange from '../../assets/close-orange.svg';

export const DeleteBtn = (props: { callback }) => {
  const { callback } = props;
  const [hovered, setHovered] = useState(false);
  return (
    <button className="gallery-btn-delete" onClick={() => callback()}>
      <img
        src={!hovered ? close : closeOrange}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        alt="delete-btn"
      />
    </button>
  );
};
