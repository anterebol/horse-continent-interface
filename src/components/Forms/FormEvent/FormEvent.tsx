import './formEvent.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { sendReqest } from '../../../store/apiReducer';
import { FieldForm } from '../FieldForm/FieldForm';

export const FormEvent = (props: {
  clsInput: string[];
  idFor: string;
  description?: string;
  was?: string;
  name?: string;
  img?: string;
  naming?: boolean;
  visible?: boolean;
  submit?: any;
}) => {
  const dispatch = useAppDispatch();
  const { token, modal } = useAppSelector((state) => state.apiReducer);
  const { clsInput, naming, idFor, submit } = props;
  const [img, setImg] = useState(props.img || '');
  const [name, setName] = useState(props.name || '');
  const [description, setPassword] = useState(props.description || '');
  const [was, setWas] = useState(props.description || '');
  const [visible, setVisible] = useState(props.visible || '');
  const submitForm = async (e) => {
    e.preventDefault();
    if (modal && !submit) {
      dispatch(sendReqest({ reqBody: { img, name, description, was } }));
      setPassword('');
    } else if (submit) {
      await dispatch(submit({ name, img, description, was, visible }));
    }

    if (!naming) {
      e.target.reset();
      setImg('');
      setPassword('');
      setName('');
    }
  };
  return (
    <>
      <form id={idFor} className={['event-form', ...clsInput].join(' ')} onSubmit={submitForm}>
        <div className="form-item-box">
          <FieldForm
            placeholder="Название"
            type="text"
            func={setName}
            cls={['add-event']}
            fieldMax={50}
            fieldMin={0}
            value={name}
            naming={naming}
          />
          <label className="event-label">
            <p className="p-event">Отметить как прошедшее</p>
            <input className="checkbox-event" type="checkbox" />
          </label>
        </div>
        <span className="datepicker-toggle">
          <span className="datepicker-toggle-button"></span>
          <input type="date" className="datepicker-input" />
        </span>
        <div className="form-item-box">
          <FieldForm
            placeholder="Ссылка на изображение"
            type="text"
            func={setImg}
            cls={['add-event']}
            fieldMax={100}
            fieldMin={0}
            value={img}
            naming={naming}
          />
          <label className="event-label">
            <p className="p-event">Скрыть мероприятие</p>
            <input className="checkbox-event" type="checkbox" />
          </label>
        </div>
        <div className="form-item-box">
          <div className="box-textarea">
            <div className="back-textarea"></div>
            <textarea placeholder="Описание" className="description-textarea" />
          </div>
        </div>
        <div></div>
      </form>
    </>
  );
};
