import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'

const MovieCard = ({movie}) => {
  const navigate = useNavigate();
  const updateMovie = (id) => {
    navigate(`/updatemovie/${id}`);
}
  return (
    <article class="card my-2">
  <img
    class="card__background"
    src={movie.image}
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
  />
  <div class="card__content | flow">
    <div class="card__content--container | flow">
      <h2 class="card__title" >{movie.name}</h2>
      <p class="card__description">
        {movie.description}
        
        <div style={{position:"absolute"}} onClick={() => updateMovie(movie._id)}>ekle</div>
      </p>
    </div>
  </div>
</article>
  )
}

export default MovieCard