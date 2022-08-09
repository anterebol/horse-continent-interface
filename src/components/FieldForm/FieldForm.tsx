import { BACK_INPUT, BOX_INPUT, FIELD_INPUT } from '../../constants/classes';
import './fieldForm.css';

const pUser = 'p-user';

export const FieldForm = (props: {
  placeholder: string;
  type: string;
  func: (e) => void;
  fieldMin: number;
  fieldMax: number;
  cls?: string[];
  value?: string;
  naming?: boolean;
}) => {
  const { placeholder, type, func, fieldMin, fieldMax, value, naming } = props;
  const cls = props.cls || [];
  return (
    <>
      {naming ? (
        <div className="box-with-naming">
          <p className={pUser}>{`${placeholder}:`}</p>
          <div className={[BOX_INPUT, ...cls].join(' ')}>
            <div className={[BACK_INPUT, ...cls].join(' ')}></div>
            <input
              className={[FIELD_INPUT, ...cls].join(' ')}
              placeholder={placeholder}
              type={type}
              value={value}
              maxLength={fieldMax}
              minLength={fieldMin}
              autoComplete="new-password"
              onChange={(e) => {
                func(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <div className={[BOX_INPUT, ...cls].join(' ')}>
          <div className={[BACK_INPUT, ...cls].join(' ')}></div>
          <input
            className={[FIELD_INPUT, ...cls].join(' ')}
            placeholder={placeholder}
            type={type}
            value={value}
            maxLength={fieldMax}
            minLength={fieldMin}
            autoComplete="new-password"
            onChange={(e) => {
              func(e.target.value);
            }}
          />
        </div>
      )}
    </>
  );
};
