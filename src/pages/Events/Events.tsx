import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { FormEvent } from '../../components/Forms/FormEvent/FormEvent';
import { EventList } from '../../components/Lists/EventList/EventList';
import { useAppDispatch } from '../../hooks/hooks';
import { addEvent } from '../../store/eventApi/eventApi';
import './events-page.css';

export const Events = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', paddingBottom: 50 }}>
      <h2 className="h2-event">Добавить мероприятие </h2>
      <Button value={'Назад'} cls={['back']} func={() => navigate(-1)} />
      <FormEvent idFor={'create-event'} submit={addEvent} clsInput={['add-event']} />
      <div className="create-button-box">
        <Button
          idFor={'create-event'}
          value={'Добавить'}
          type="submit"
          cls={['update', 'right-40']}
          func={() => {}}
        />
      </div>
      <EventList />
    </div>
  );
};
