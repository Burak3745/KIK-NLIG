import React, { useState, useEffect } from 'react';
import GenreCollection from '../components/GenreCollection';
import { GenresGet } from "../axios/index.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/Browser.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { SliderData } from '../components/SliderData.js';
const Browser = ({ user }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      GenresGet()
        .then((res) => {
          console.log(res);
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
      !isLoading && (

        <Container fluid>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={10000}

          >
            {SliderData.map((item) => (
              <div className='py-2'>
                <img style={{ width: "100%", borderRadius: "20px" }} src={item.image} />
                <div className='black-hover' style={{ width: "100%", borderRadius: "20px", position: "absolute", top: "7px", height: "720px" }}></div>
                <div style={{ position: "absolute", left: "120px", top: "300px" }}>
                  <div style={{ width: "600px", textAlign:"justify" }}>
                    <h5 style={{ color: "white", fontWeight:"bold" }}>{item.name}</h5>
                    <h6 style={{ color: "rgba(255, 255, 255, 0.5)"}}><span style={{ padding:"0 10px", borderRight:"1px solid rgba(255, 255, 255, 0.5)"}}>{item.year}</span>
                    <span style={{ padding:"0 10px", borderRight:"1px solid rgba(255, 255, 255, 0.5)"}}>{item.time}</span> <span style={{ padding:"0 10px"}}>{item.country}</span></h6>
                    <h7 style={{ color: "white" }}>{item.title}</h7> </div> <br/>
                  <Link to={`${item.link}`}>
                    <button className='button-24' style={{}} >İzle</button>
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
    );
  }
}

export default Browser;