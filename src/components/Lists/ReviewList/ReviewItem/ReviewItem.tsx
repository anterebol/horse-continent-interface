import { useState } from 'react';
import { addStars } from '../../../../utils/stars';
import user from '../../../../assets/review/user.svg';
import down from '../../../../assets/review/arrow-down.svg';
import { ReviewType } from '../../../../types/types';
import './reviewItem.css';
import { DeleteBtn } from '../../../Button/DeleteBtn';
import { useAppDispatch } from '../../../../hooks/hooks';
import { removeReview } from '../../../../store/reviewApi/reviewApi';

export const ReviewItem = (props: { review: ReviewType }) => {
  const dispatch = useAppDispatch();
  const [fullReview, setFullReview] = useState(false);
  const { name, stars, description, date, id } = props.review;

  const changeFull = () => setFullReview(!fullReview);

  const updateDate = (date) => {
    const current = date.split('-');
    return current[2].slice(0, 2) + '-' + current[1] + '-' + current[0];
  };

  const remove = () => {
    dispatch(removeReview({ id }));
  };

  return (
    <div className="review">
      <div className="review-high">
        <div className="box-img-user">
          <img className="img-user" src={user} alt="" />
        </div>
        <div className="box-all-stars">{addStars(stars).map((star) => star)}</div>
        <p className="review-date">{updateDate(date)}</p>
      </div>
      <DeleteBtn callback={remove} />
      <p className="review-name">{name}</p>
      <p className={['review-description', fullReview ? 'full' : ''].join(' ')}>{description}</p>
      <img src={down} onClick={changeFull} className="open-review" />
    </div>
  );
};
