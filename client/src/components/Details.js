
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from './Rating';

export default function Details() {
   const { id } = useParams();
   const [details, setDetails] = useState(null);

   useEffect(() => {
     fetch(`/api/details/${id}`)
        .then((res) => res.json())
        .then((res) => setDetails(res));
   }, [id]);

   return (
   details && (

    <div className="details-panel">
        <div className="details-content">
           <h1>{details.name}</h1>
           <Rating score={details.vote_average} style={{ top: '0px' }} /
           >
           <p>{details.overview}</p>
           <Link to={`/play/${id}`} className="play-btn">
              Play
           </Link>
       </div>
       <img src={`./images/${details.poster_path}`} alt={details.name}
       />
   </div>

  )
 );
}