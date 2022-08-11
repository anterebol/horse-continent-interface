import { useAppSelector } from '../../../hooks/hooks';
import { EventItem } from './EventItem/EventItem';

export const EventList = () => {
  const { events } = useAppSelector((state) => state.apiReducer);
  return (
    <div>
      <ul>
        {events.map((item) => (
          <EventItem key={item['id']} event={item} />
        ))}
      </ul>
    </div>
  );
};
