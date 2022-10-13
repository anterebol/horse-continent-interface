import { useEffect, useState } from 'react';
import './galleryItem.css';
import spinner from '../../../../assets/spinner.gif';

export const Image = (props: { id: string; src: string }) => {
  const { id, src } = props;
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        setLoaded(true);
      };
    }, 500);
  }, []);

  return (
    <li
      className={['gallery-item', clicked ? 'clicked' : ''].join(' ')}
      id={id}
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      {loaded ? (
        <img src={src} alt="gallery-image" className="gallery-img" />
      ) : (
        <img src={spinner} alt="" className="gallery-spinner" />
      )}
    </li>
  );
};
