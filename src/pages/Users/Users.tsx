import { FormUser } from '../../components/Forms/FormUser.tsx/FormUser';
import { ListUsers } from '../../components/ListUsers/ListUsers';
import { BtnUser } from '../../components/UserItem/ButtonUser/BtnUser';
export const Users = () => {
  return (
    <div>
      <h1 className="add-title">Создать пользователя</h1>
      <FormUser idFor={'user-create-id'} clsInput={['add-user']} />
      <div style={{ textAlign: 'right' }}>
        <BtnUser
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
