import { FormUser } from '../../components/Forms/FormUser.tsx/FormUser';
import { ListUsers } from '../../components/Lists/ListUsers/ListUsers';
import { Button } from '../../components/Button/Button';
import { addUser } from '../../store/userApi/userApi';
import { Modal } from '../../components/Modal/Modal';
import { useAppSelector } from '../../hooks/hooks';

export const Users = () => {
  const { modal } = useAppSelector((state) => state.apiReducer);
  return (
    <div style={{ paddingBottom: 30 }}>
      {modal ? <Modal /> : null}
      <h1 className="add-title">Создать пользователя</h1>
      <FormUser submit={addUser} idFor={'user-create-id'} clsInput={['add-user']} />
      <div style={{ textAlign: 'right' }}>
        <Button
          type="submit"
          idFor={'user-create-id'}
          value={'Создать'}
          cls={['update', 'right']}
          func={() => {}}
        />
      </div>
      <ListUsers />
    </div>
  );
};
