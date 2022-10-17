import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ReviewList } from '../../components/Lists/ReviewList/ReviewList';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { chengeReviewPage, closeApp } from '../../store/apiReducer';
import { getReview, getReviewPages } from '../../store/reviewApi/reviewApi';
import './reviews.css';
import left from '../../assets/left.svg';
import right from '../../assets/right.svg';
import spinner from '../../assets/spinner.gif';

export const Reviews = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { page } = useParams();
  const { maxCountReviewPages, reviews, reviewPage, loaded } = useAppSelector(
    (state) => state.apiReducer
  );
  const [currentPage, setCurrentPage] = useState(Number(page || 1));

  useEffect(() => {
    dispatch(getReviewPages());
    dispatch(getReview({ page: page || '1' }));
  }, [page]);

  useEffect(() => {
    if (reviews.length === 0 && Number(page) >= 2) {
      chengePage(Number(page) - 1);
    }
  }, [reviews]);

  const chengePage = (page) => {
    dispatch(chengeReviewPage(page));
    setCurrentPage(page);
    navigate('/review/' + page);
  };

  return (
    <div style={{ width: '100%', paddingBottom: 50, position: 'relative', minHeight: 300 }}>
      <h2 className="add-title">Отзывы</h2>
      <Button value={'Назад'} cls={['back']} func={() => navigate('/')} />
      <Button value={'Выход'} cls={['exit']} func={() => dispatch(closeApp())} />
      {loaded ? (
        reviews.length > 0 ? (
          <>
            <ReviewList />
            <nav className="nav-review">
              <button
                className="nav-review-link"
                onClick={() => {
                  chengePage(Number(reviewPage) - 1);
                }}
                disabled={currentPage < 2}
              >
                <img src={left} alt="left" />
              </button>
              {new Array(Number(maxCountReviewPages)).fill('').map((_, i) => {
                return (
                  <button
                    key={i}
                    className="nav-review-link"
                    onClick={() => {
                      chengePage(i + 1);
                    }}
                    disabled={i + 1 === Number(page)}
                  >
                    {i + 1}
                  </button>
                );
              })}
              <button
                className="nav-review-link"
                onClick={() => {
                  chengePage(Number(reviewPage) + 1);
                }}
                disabled={currentPage >= Number(maxCountReviewPages)}
              >
                <img src={right} alt="right" />
              </button>
            </nav>
          </>
        ) : (
          <h2 className="add-title">Отзывов пока нет</h2>
        )
      ) : (
        <img className="review-spinner" src={spinner} alt="preloader" />
      )}
    </div>
  );
};
