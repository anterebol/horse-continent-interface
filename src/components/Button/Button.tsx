import './btn.css';
export const Button = (props: {
  value: string;
  cls: string[];
  func?: any;
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
      onClick={(e) => func(e)}
    >
      {value}
    </button>
  );
};
