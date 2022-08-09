import { BACK_P_CLS, BOX_P_CLS, P_CLS } from '../../../constants/classes';
import './p.css';
export const ParagraphUser = (props: { option: string; value: string }) => {
  const { option, value } = props;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <span style={{ margin: 'auto 0' }}>{`${option}:`}</span>
      <div className={BOX_P_CLS} style={{ margin: 'auto 5px' }}>
        <div className={BACK_P_CLS}></div>
        <p className={P_CLS}>{value}</p>
      </div>
    </div>
  );
};
