import { FormUser } from '../../components/Forms/FormUser.tsx/FormUser';
import { ListUsers } from '../../components/ListUsers/ListUsers';
import { ACTIVATE_BUTTON, BACK_INPUT } from '../../constants/classes';
export const Users = () => {
  return (
    <div>
      <h1 className="add-title">Создать пользователя</h1>
      <FormUser
        clsButton={[ACTIVATE_BUTTON, 'add-btn']}
        clsInput={['add-user', '']}
        clsSelect={[BACK_INPUT, 'select-back']}
        btnName={'Создать'}
      />
      <ListUsers />
    </div>
  );
};
