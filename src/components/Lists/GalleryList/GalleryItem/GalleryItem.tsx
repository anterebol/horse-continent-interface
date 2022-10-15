import { useEffect, useState } from 'react';
import './galleryItem.css';
import spinner from '../../../../assets/spinner.gif';
import close from '../../../../assets/close-white.svg';
import closeOrange from '../../../../assets/close-orange.svg';
import { useAppDispatch } from '../../../../hooks/hooks';
import { removeGalleryImage } from '../../../../store/galleryApi/galleryApi';
import { DeleteBtn } from '../../../Button/DeleteBtn';

export const Image = (props: { id: string; src: string }) => {
  const dispatch = useAppDispatch();
  const { id, src } = props;
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        setLoaded(true);
      };
    }, 500);
  }, []);

  const removeImage = () => {
    dispatch(removeGalleryImage({ id }));
  };

  return (
    <li
      className={['gallery-item', clicked ? 'clicked' : ''].join(' ')}
      id={id}
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      <DeleteBtn callback={removeImage} />
      {loaded ? (
        <img src={src} alt="gallery-image" className="gallery-img" />
      ) : (
        <img src={spinner} alt="" className="gallery-spinner" />
      )}
    </li>
  );
};
