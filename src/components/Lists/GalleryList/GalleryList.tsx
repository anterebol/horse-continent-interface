import { useState, useEffect } from 'react';
import './galleryList.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getGallery } from '../../../store/galleryApi/galleryApi';
import { Image } from './GalleryItem/GalleryItem';
export const GalleryList = () => {
  const dispatch = useAppDispatch();
  const { gallery } = useAppSelector((state) => state.apiReducer);

  useEffect(() => {
    dispatch(getGallery());
  }, []);

  return (
    <ul className="gallery-list">
      {gallery.map((image) => {
        const { id, src } = image;
        return <Image key={id} id={id} src={src} />;
      })}
    </ul>
  );
};
