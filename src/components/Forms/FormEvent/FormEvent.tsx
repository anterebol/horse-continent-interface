import './formEvent.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
// import { sendReqest } from '../../../store/apiReducer';
import { FieldForm } from '../FieldForm/FieldForm';
import { sendReqest } from '../../../store/apiReducer';

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
  const { token, modal } = useAppSelector((state) => state.apiReducer);
  const { clsInput, naming, idFor, submit } = props;
  const [img, setImg] = useState(props.img || '');
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [was, setWas] = useState(props.was || false);
  const [visible, setVisible] = useState(props.visible || false);
  const [date, setDate] = useState(props.date || '');
  const [order, setOrder] = useState(props.order || '');
  console.log(date);
  const submitForm = async (e) => {
    e.preventDefault();
    console.log('work');
    if (modal && !submit) {
      dispatch(sendReqest({ reqBody: { name, img, description, was, visible } }));
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
            cls={['add-event']}
            fieldMax={50}
            fieldMin={0}
            value={name}
            naming={naming}
          />
          <label className="event-label">
            <p className="p-event">Отметить как прошедшее</p>
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
        <span className="datepicker-toggle">
          <span className="datepicker-toggle-button"></span>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
            required={true}
            className="datepicker-input"
          />
        </span>
        <div className="form-item-box">
          <FieldForm
            placeholder="Ссылка на изображение"
            type="text"
            func={setImg}
            cls={['add-event']}
            fieldMax={1000}
            fieldMin={0}
            value={img}
            naming={naming}
            required={false}
          />
          <label className="event-label">
            <p className="p-event">Скрыть мероприятие</p>
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
            <div className="back-textarea"></div>
            <textarea
              placeholder="Описание"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="description-textarea"
            />
          </div>
        </div>
      </form>
    </>
  );
};
