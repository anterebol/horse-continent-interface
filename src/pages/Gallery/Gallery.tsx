import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { GalleryForm } from '../../components/Forms/FormGallery/FormGallery';
import { GalleryList } from '../../components/Lists/GalleryList/GalleryList';
import { useAppDispatch } from '../../hooks/hooks';
import { closeApp } from '../../store/apiReducer';
import { addImage } from '../../store/galleryApi/galleryApi';

const galleryForIf = 'create-image';

export const Gallery = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <h2 className="add-title">Добавить изображение </h2>
      <Button value={'Назад'} cls={['back']} func={() => navigate(-1)} />
      <Button value={'Выход'} cls={['exit']} func={() => dispatch(closeApp())} />
      <GalleryForm idFor={galleryForIf} clsInput={[]} submit={addImage} />
      <Button idFor={galleryForIf} value={'Добавить'} type="submit" cls={['update', 'right-40']} />
      <h2 className="h2-event">Галерея </h2>
      <GalleryList />
    </div>
  );
};
