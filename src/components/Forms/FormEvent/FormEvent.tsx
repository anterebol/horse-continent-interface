import './formEvent.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
// import { sendReqest } from '../../../store/apiReducer';
import { FieldForm } from '../FieldForm/FieldForm';
import { openModal, removeModal, sendReqest } from '../../../store/apiReducer';
import { updateEvent } from '../../../store/eventApi/eventApi';

export const FormEvent = (props: {
  clsInput: string[];
  idFor?: string;
  description?: string;
  was?: boolean;
  name?: string;
  img?: string;
  naming?: boolean;
  date?: string;
  visible?: boolean;
  submit?: any;
  order?: number;
}) => {
  const dispatch = useAppDispatch();
  const { token, modal, operationId } = useAppSelector((state) => state.apiReducer);
  const { clsInput, naming, idFor, submit } = props;
  const [img, setImg] = useState(props.img || '');
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [was, setWas] = useState(props.was || false);
  const [visible, setVisible] = useState(props.visible || false);
  const [date, setDate] = useState(props.date || '');
  const [order, setOrder] = useState(props.order || 0);

  const submitForm = async (e) => {
    e.preventDefault();
    if (modal && !submit) {
      dispatch(openModal(''));
      await dispatch(
        updateEvent({ name, img, description, was, visible, date, order, id: operationId })
      );
      dispatch(removeModal());
    } else if (submit) {
      await dispatch(submit({ name, img, description, was, visible, date }));
    }

    e.target.reset();
    setImg('');
    setName('');
    setWas(false);
    setVisible(false);
    setDate('');
    setDescription('');
  };
  return (
    <>
      <form id={idFor} className={['event-form', ...clsInput].join(' ')} onSubmit={submitForm}>
        <div className="form-item-box">
          <FieldForm
            placeholder="Название"
            type="text"
            func={setName}
            cls={['add-event', ...clsInput]}
            fieldMax={50}
            fieldMin={0}
            value={name}
            naming={naming}
          />
          <label className="event-label">
            <p className={['p-event', ...clsInput].join(' ')}>Отметить как прошедшее</p>
            <input
              onChange={() => {
                setWas(!was);
              }}
              checked={was}
              className="checkbox-event"
              type="checkbox"
            />
          </label>
        </div>
        <span className={['datepicker-toggle', ...clsInput].join(' ')}>
          <span className="datepicker-toggle-button"></span>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
            required={true}
            className={['datepicker-input'].join(' ')}
          />
        </span>
        <div className="form-item-box">
          <FieldForm
            placeholder="Ссылка на изображение"
            type="text"
            func={setImg}
            cls={['add-event', ...clsInput]}
            fieldMax={1000}
            fieldMin={0}
            value={img}
            naming={naming}
            required={false}
          />
          <label className={['event-label', ...clsInput].join(' ')}>
            <p className={['p-event', ...clsInput].join(' ')}>Скрыть мероприятие</p>
            <input
              className="checkbox-event"
              onChange={() => {
                setVisible(!visible);
              }}
              checked={visible}
              type="checkbox"
            />
          </label>
        </div>
        <div className="form-item-box">
          <div className="box-textarea">
            <div className={['back-textarea', ...clsInput].join(' ')}></div>
            <textarea
              placeholder="Описание"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="description-textarea"
            />
          </div>
        </div>
      </form>
    </>
  );
};
