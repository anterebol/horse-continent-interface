import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getReview } from '../../../store/reviewApi/reviewApi';
import { ReviewItem } from './ReviewItem/ReviewItem';

export const ReviewList = () => {
  const dispatch = useAppDispatch();
  const { reviews } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {
    dispatch(getReview());
  }, []);
  return (
    <ul>
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review} />;
      })}
    </ul>
  );
};
