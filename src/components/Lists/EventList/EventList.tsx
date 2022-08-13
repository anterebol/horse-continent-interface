import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getEvents } from '../../../store/eventApi/eventApi';
import { Preloader } from '../../Preloader/Preloader';
import { EventItem } from './EventItem/EventItem';

export const EventList = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.apiReducer);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(getEvents()).then(() => setLoaded(true));
  }, []);
  return (
    <div>
      <ul style={{ minHeight: 200, position: 'relative' }}>
        {loaded ? (
          events.map((item, index) => <EventItem key={item['id'] || index} event={item} />)
        ) : (
          <Preloader />
        )}
      </ul>
    </div>
  );
};
