import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { FormEvent } from '../../components/Forms/FormEvent/FormEvent';
import { EventList } from '../../components/Lists/EventList/EventList';
import './events-page.css';

export const Events = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="h2-event">Добавить мероприятие </h2>
      <Button value={'Назад'} cls={['back']} func={() => navigate(-1)} />
      <FormEvent idFor={'create-event'} clsInput={['add-user']} />
      <div className="create-button-box">
        <Button
          idFor={'create-event'}
          value={'Добавить'}
          cls={['update', 'right-40']}
          func={() => {}}
        />
      </div>
      <EventList />
    </div>
  );
};
