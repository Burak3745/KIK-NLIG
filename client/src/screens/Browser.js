import React, { useState, useEffect } from 'react';
import GenreCollection from '../components/GenreCollection';
import { GenresGet } from "../axios/index.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/Browser.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { SliderData } from '../components/SliderData.js';
import { motion } from "framer-motion";
const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const Browser = ({ user }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      GenresGet()
        .then((res) => {
          setGenres(res.data);
          setIsLoading(false);
        })
        .catch(() => console.log('Error fetching data...'));
    } else {
      setGenres([]);
      setIsLoading(false);
    }
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {

    return (
      <motion.div
        className="py-3"
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        !isLoading && (

        <Container fluid>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={10000}

          >
            {SliderData.map((item) => (
              <div class='Carousel-div' className='py-2'>
                <img class='Carousel-img' src={item.image} />
                <div class='Carousel-black'></div>
                <div class='Carousel-div-text'>
                  <h5 class='Carousel-h5' >{item.name}</h5>
                  <h6 class='Carousel-h6'>
                    <span class='Carousel-span1'>{item.year}</span>
                    <span class='Carousel-span1'>{item.time}</span>
                    <span class='Carousel-span2'>{item.country}</span>
                  </h6>
                  <p class='Carousel-p'>{item.title}</p>

                  <Link to={`${item.link}`}>
                    <button className='button-24 mx-3'>İzle</button>
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
          {
            genres.map((genre) => (
              <GenreCollection key={genre.id} genre={genre} />
            ))}
        </Container>

        )
      </motion.div>
    );
  }
}

export default Browser;