import { FormUser } from '../../components/Forms/FormUser.tsx/FormUser';
import { ListUsers } from '../../components/Lists/ListUsers/ListUsers';
import { Button } from '../../components/Button/Button';
import { addUser } from '../../store/userApi/userApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { closeApp } from '../../store/apiReducer';

export const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div style={{ paddingBottom: 30 }}>
      <Button value={'Назад'} cls={['back']} func={() => navigate(-1)} />
      <h1 className="add-title">Создать пользователя</h1>
      <Button value={'Выход'} cls={['exit']} func={() => dispatch(closeApp())} />
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
