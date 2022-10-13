import { useAppSelector } from '../../../hooks/hooks';
import { Button } from '../../Button/Button';
import { FormEvent } from '../../Forms/FormEvent/FormEvent';

export const EventModal = () => {
  const { operationId, events } = useAppSelector((state) => state.apiReducer);
  const idFor = `event-item-${operationId}`;
  const eventItem = events[events.findIndex((event) => event.id === operationId)];
  return (
    <div>
      <FormEvent
        clsInput={['event-modal']}
        name={eventItem.name}
        img={eventItem.img}
        description={eventItem.description}
        was={eventItem.was}
        visible={eventItem.visible}
        date={eventItem.date}
        idFor={idFor}
      />
      <Button value={'Изменить'} cls={['update']} idFor={idFor} type={'submit'} />
    </div>
  );
};
