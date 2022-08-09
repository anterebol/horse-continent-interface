import './btnUser.css';
export const BtnUser = (props: { value: string; cls: string[]; func: () => void }) => {
  const { value, cls, func } = props;
  return (
    <button className={cls.join(' ')} onClick={() => func()}>
      {value}
    </button>
  );
};
