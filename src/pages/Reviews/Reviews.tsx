import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ReviewList } from '../../components/Lists/ReviewList/ReviewList';

export const Reviews = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', paddingBottom: 50 }}>
      <h2 className="h2-event">Отзывы</h2>
      <Button value={'Назад'} cls={['back']} func={() => navigate(-1)} />
      <ReviewList />
    </div>
  );
};
