import { FormUser } from '../../components/Forms/FormUser.tsx/FormUser';
import { ListUsers } from '../../components/Lists/ListUsers/ListUsers';
import { Button } from '../../components/Button/Button';
import { addUser } from '../../store/userApi/userApi';
import { Modal } from '../../components/Modal/Modal';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

export const Users = () => {
  const { modal } = useAppSelector((state) => state.apiReducer);
  const navigate = useNavigate();
  return (
    <div style={{ paddingBottom: 30 }}>
      {modal ? <Modal /> : null}
      <Button value={'Назад'} cls={['back']} func={() => navigate(-1)} />
      <h1 className="add-title">Создать пользователя</h1>
      <FormUser submit={addUser} idFor={'user-create'} clsInput={['add-user']} />
      <div style={{ textAlign: 'right' }}>
        <Button
          type="submit"
          idFor={'user-create'}
          value={'Создать'}
          cls={['update', 'right']}
          func={() => {}}
        />
      </div>
      <ListUsers />
    </div>
  );
};
