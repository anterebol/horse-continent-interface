import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { FieldForm } from '../FieldForm/FieldForm';

export const GalleryForm = (props: { idFor: string; clsInput: Array<string>; submit: any }) => {
  const dispatch = useAppDispatch();
  const { idFor, clsInput, submit } = props;
  const [img, setImg] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    await dispatch(submit({ src: img }));
    e.target.reset();
    setImg('');
  };

  return (
    <form id={idFor} className={['event-form', ...clsInput].join(' ')} onSubmit={submitForm}>
      <div className="form-item-box">
        <FieldForm
          placeholder="Ссылка на изображение"
          type="text"
          func={setImg}
          cls={['add-event', ...clsInput]}
          fieldMax={1000}
          fieldMin={0}
          value={img}
        />
      </div>
    </form>
  );
};
