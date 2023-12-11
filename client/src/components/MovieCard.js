import { BsPlayFill, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function MovieCard({ name, id, vote_average, 
backdrop_path, poster_path }) {

    let imgSrc = backdrop_path ? backdrop_path : poster_path;
    let style = {
        backgroundImage: `url(/images${imgSrc})`,
    };

    return (
    <div className="movie-card" style={style}>
       <div className="movie-details">
        <h4>{name}</h4>
        <Rating score={vote_average} />
        <Link to={`/play/${id}`}>
            <BsPlayFill className="play-btn" />
        </Link>
        <Link to={`/details/${id}`}></Link>
          <BsChevronUp className="details-btn" />
      </div>
    </div>
    );
}