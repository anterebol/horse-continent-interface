import { BACK_INPUT, BOX_INPUT, FIELD_INPUT } from '../../constants/classes';
import './fieldForm.css';
export const FieldForm = (props: {
  placeholder: string;
  type: string;
  func: (e) => void;
  cls: string[];
  fieldMin: number;
  fieldMax: number;
}) => {
  const { placeholder, type, func, cls, fieldMin, fieldMax } = props;
  return (
    <div className={[BOX_INPUT, ...cls].join(' ')}>
      <div className={BACK_INPUT}></div>
      <input
        className={FIELD_INPUT}
        placeholder={placeholder}
        type={type}
        maxLength={fieldMax}
        minLength={fieldMin}
        autoComplete="new-password"
        onChange={(e) => {
          // console.log(e.target.value);
          func(e.target.value);
        }}
      />
    </div>
  );
};
