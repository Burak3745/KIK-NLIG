import { BsStarFill } from 'react-icons/bs';

export default function Rating({ score, style }) {
    return (score > 0 && (
    <div className="rating" style={style}>
        {Array.from(Array(Math.floor(Number(score/2)))).map((_, i) => (
        <BsStarFill className="rating-stars" key={i} />
        ))}
    </div>
    )
  );
}