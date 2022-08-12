import { delModal } from '../../../../constants/modals';
import { useAppDispatch } from '../../../../hooks/hooks';
import { openModal, addOperationId } from '../../../../store/apiReducer';
import { EventType } from '../../../../types/types';
import { Button } from '../../../Button/Button';
import camera from '../../../../assets/camera.svg';
import { Paragraph } from '../../../Paragraph/Paragraph';
import './event.css';
import { useState } from 'react';

export const EventItem = (props: { event: EventType }) => {
  const dispatch = useAppDispatch();
  const { name, description, id, visible, was, date } = props.event;
  console.log({ name, description, id, visible, was, date });
  const img = props.event.img || camera;
  const [overflow, setOverflow] = useState(true);
  const removeEvent = () => {
    dispatch(addOperationId(id));
    dispatch(openModal(delModal));
  };
  const updateEvent = () => {
    dispatch(addOperationId(id));
    dispatch(openModal(updateEvent));
  };

  return (
    <li className="event-box" id={id}>
      <div className="event-back"></div>
      <div className="event-interface">
        <div className="box-event-inside">
          <div className="box-event-img">
            <img className="event-img" src={img} />
          </div>
          <div className="box-info">
            <div className="main-info-event">
              <p className="header-event">{name}</p>
              <p className="header-event">{date}</p>
            </div>
            <p className={['description-event', overflow ? 'hide' : ''].join(' ')}>{description}</p>

            <div className="footer-event">
              <div className="box-short-info">
                <Paragraph option={'Отображается на сайте'} value={visible ? 'Да' : 'Нет'} />
                <Paragraph option={'Отмечено как пройденое'} value={was ? 'Да' : 'Нет'} />
              </div>
              <div className="event-buttons">
                <Button cls={['del']} value="Удалить" func={removeEvent} />
                <Button
                  type="submit"
                  idFor={`event-form-${id}`}
                  cls={['update']}
                  value="Изменить"
                  func={updateEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
