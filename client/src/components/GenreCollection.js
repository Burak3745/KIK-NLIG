import { useState, useEffect } from 'react';
import MovieCard from './MovieCard1'

import { getMovieAction } from '../action/movieAction'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../css/GenreCollection.css";

const GenreCollection = ({ genre }) => {
  const movie = useSelector(state => state.movie)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movie[0]) {
      dispatch(getMovieAction());
    }
  }, [dispatch, movie]);

  const useWindowWide = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [setWidth]);

    return width;
  };

  const kutuCount = Math.round(useWindowWide() / 300);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: kutuCount,
      slidesToSlide: kutuCount // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: kutuCount,
      slidesToSlide: kutuCount // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: kutuCount,
      slidesToSlide: kutuCount // optional, default to 1.
    }
  };

  return (
    <div className="movie-row" style={{ height: "300px" }}>

      <h3 style={{ color: '#2dffb9' }} >{genre.name}</h3>

      <Carousel swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        centerMode={true}
        centerSlidePercentage={true}
        renderDotsOutside={true}
      >
        {movie.filter((item) => {
          if (genre.name === item.catagory) {
            return item
          }
          return null;
        })
          .slice(0, 20)
          .map((movie) => (
            <div style={{ height: "300px" }}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default GenreCollection