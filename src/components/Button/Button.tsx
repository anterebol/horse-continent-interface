import './btn.css';
export const Button = (props: {
  value: string;
  cls: string[];
  func: () => void;
  disabled?: boolean;
  idFor?: string;
  type?: string;
}) => {
  const { value, cls, func, disabled, idFor, type } = props;
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      form={idFor}
      disabled={disabled}
      className={['btn-user', ...cls].join(' ')}
      onClick={() => func()}
    >
      {value}
    </button>
  );
};
