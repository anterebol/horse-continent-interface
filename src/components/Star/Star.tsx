import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// import { hovereStars } from '../../store/appReducer';
import star from '../../assets/review/star.svg';
import goldStar from '../../assets/review/gold-star.svg';
import { isGoldStar } from '../../utils/stars';
import './star.css';

export const Star = (props: {
  isGold: boolean;
  type?: string;
  position: number;
  isFormStar?: boolean;
}) => {
  const { position, isGold } = props;
  // const dispath = useAppDispatch();
  // const { hoveredStars, choisesStars } = useAppSelector((state) => state.appReducer);
  // const mouseHovered = (position: number) => {
  //   dispath(hovereStars(position));
  // };
  // const updateStars = (position: number) => {
  //   if (isFormStar) {
  //     dispath(choiseStars(position));
  //   }
  // };

  return (
    <div
      className={['box-star', props.type].join(' ')}
      // onMouseEnter={() => mouseHovered(position)}
      // onMouseLeave={() => mouseHovered(0)}
      // onClick={() => updateStars(position)}
    >
      <img
        property={position.toString()}
        className="img-star"
        src={isGold ? goldStar : star}
        alt=""
      />
    </div>
  );
};
