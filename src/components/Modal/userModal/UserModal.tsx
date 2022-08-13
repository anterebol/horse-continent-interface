import { Dispatch, SetStateAction } from 'react';
import { DEL_USER_MODAL } from '../../../constants/modals';
import { Button } from '../../Button/Button';
import { FieldForm } from '../../Forms/FieldForm/FieldForm';

export const UserModal = (props: {
  submit: (e: any) => Promise<void>;
  setPass: Dispatch<SetStateAction<string>>;
  modal: string;
  pass: string;
}) => {
  const { submit, setPass, modal, pass } = props;
  return (
    <>
      <h2 className="modal-title">Введите пароль для подтверждения</h2>
      <form onSubmit={submit}>
        <FieldForm
          placeholder={'Пароль'}
          type={'password'}
          func={setPass}
          fieldMin={4}
          fieldMax={15}
        />
        {modal === DEL_USER_MODAL ? (
          <Button
            type="submit"
            cls={['del']}
            disabled={pass.length < 4 || pass.length > 15 ? true : false}
            value="Удалить"
            func={() => {}}
          />
        ) : (
          <Button
            type="submit"
            disabled={pass.length < 4 || pass.length > 15 ? true : false}
            cls={['update']}
            value="Изменить"
            func={() => {}}
          />
        )}
      </form>
    </>
  );
};
