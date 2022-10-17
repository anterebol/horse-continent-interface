import { useAppSelector } from '../../../hooks/hooks';
import { ReviewItem } from './ReviewItem/ReviewItem';

export const ReviewList = () => {
  const { reviews } = useAppSelector((state) => state.apiReducer);

  return (
    <ul className="review-list">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review} />;
      })}
    </ul>
  );
};
