import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getEvents } from '../../../store/eventApi/eventApi';
import { EventItem } from './EventItem/EventItem';

export const EventList = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  return (
    <div>
      <ul>
        {events.map((item, index) => (
          <EventItem key={item['id'] || index} event={item} />
        ))}
      </ul>
    </div>
  );
};
