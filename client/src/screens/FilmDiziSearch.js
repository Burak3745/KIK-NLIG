import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/Films.css'
const FilmDiziSearch = () => {
  const { search } = useParams()
  const movie = useSelector(state => state.movie)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!movie[0]) {
      dispatch(getMovieAction());
    }
  }, [dispatch]);
  const [catagory, setCatagory] = useState('')
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
    <div>
      <div class="select-dropdown  mx-3">
        <select onChange={(e) => setCatagory(e.target.value)}>
          <option value=''>All</option>
          <option value="Action & Advanture">Action & Advanture</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
          <option value="Kids">Kids</option>
          <option value="Mystery">Mystery</option>
          <option value="News">News</option>
          <option value="Reality">Reality</option>
          <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
          <option value="Soap">Soap</option>
          <option value="Talk','War & Politics">Talk','War & Politics</option>
          <option value="Western">Western</option>
        </select>
      </div>
      <Row>
        <h2>Film</h2>
        <Carousel
          responsive={responsive}
        >
          {movie.filter((item) => {
            if (item.type === "Film") { return item }
            else {
              return
            }
          })
            .filter((item) => {
              if (search == 0) { return item }
              else {
                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
              }
            })
            .filter(item => {
              if (catagory === '') return item
              else
                return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
            })

            .map((movie) => (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={movie._id}
                style={{ width: "160px", height: "250px" }}
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
        </Carousel>
        <h2>Dizi</h2>
        <Carousel
          responsive={responsive}
        >
          {movie.filter((item) => {
            if (item.type === "Dizi") { return item }
            else {
              return
            }
          })
            .filter((item) => {
              if (search == 0) { return item }
              else {
                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
              }
            })
            .filter(item => {
              if (catagory === '') return item
              else
                return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
            })

            .map((movie) => (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={movie._id}
                style={{ width: "160px", height: "350px" }}
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
        </Carousel>
      </Row>


    </div>
  )
}

export default FilmDiziSearch