import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { EventItem } from '../ServiceItem/ServiceItem';

export const EventList = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.apiReducer);
  return (
    <div>
      <ul>
        {events.map((item) => (
          <EventItem key={item['id']} item={item} />
        ))}
      </ul>
    </div>
  );
};
