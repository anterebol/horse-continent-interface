import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ReviewList } from '../../components/Lists/ReviewList/ReviewList';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { chengeReviewPage } from '../../store/apiReducer';
import { getReview, getReviewPages } from '../../store/reviewApi/reviewApi';

export const Reviews = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { page } = useParams();
  const { maxCountReviewPages, loaded, reviews } = useAppSelector((state) => state.apiReducer);

  // useEffect(() => {
  //   dispatch(getReviewPages());
  //   dispatch(getReview({ page: page || '1' }));
  // }, []);

  useEffect(() => {
    dispatch(getReviewPages());
    dispatch(getReview({ page: page || '1' }));
  }, [page]);

  const chengePage = (page) => {
    dispatch(chengeReviewPage(page));
    navigate('/review/' + page);
  };

  return (
    <div style={{ width: '100%', paddingBottom: 50 }}>
      <h2 className="h2-event">Отзывы</h2>
      <Button value={'Назад'} cls={['back']} func={() => navigate('/')} />
      {loaded ? (
        <>
          <ReviewList />
          <ul className="review-pagination">
            {new Array(Number(maxCountReviewPages)).fill('').map((_, i) => {
              return (
                <li key={i}>
                  <button
                    className="review-pagination-btn"
                    onClick={() => {
                      chengePage(i + 1);
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
};
