import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { ReviewItem } from './ReviewItem/ReviewItem';

export const ReviewList = () => {
  const { page } = useParams();
  const { reviews } = useAppSelector((state) => state.apiReducer);
  const navigate = useNavigate();

  return (
    <ul className="review-list">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review} />;
      })}
    </ul>
  );
};
