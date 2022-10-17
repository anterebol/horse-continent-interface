import { Star } from '../components/Star/star';

export const addStars = (n: number) => {
  const stars = [] as Array<JSX.Element>;
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} isGold={i <= n} position={i} />);
  }
  return stars;
};
export function isGoldStar(position: number, hoveredStars: number, choisesStars: number) {
  if (hoveredStars > choisesStars) {
    return position <= hoveredStars;
  } else if (choisesStars > 0) {
    return position <= choisesStars;
  } else return false;
}
