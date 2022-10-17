import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// import { hovereStars } from '../../store/appReducer';
import star from '../../assets/review/star.svg';
import goldStar from '../../assets/review/gold-star.svg';
import './star.css';

export const Star = (props: {
  isGold: boolean;
  type?: string;
  position: number;
  isFormStar?: boolean;
}) => {
  const { position, isGold } = props;

  return (
    <div className={['box-star', props.type].join(' ')}>
      <img
        property={position.toString()}
        className="img-star"
        src={isGold ? goldStar : star}
        alt=""
      />
    </div>
  );
};
