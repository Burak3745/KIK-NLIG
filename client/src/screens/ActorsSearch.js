import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/Films.css'
import { getIdActors } from '../axios'
const ActorsSearch = () => {
    const { id } = useParams()
    const movie = useSelector(state => state.movie)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!movie[0]) {
            dispatch(getMovieAction());
        }
    }, [dispatch]);
    const [actorsData, setActorsData] = useState({
        name: '', image: ''
    })

    useEffect(() => {
        const getActors = async () => {
            const { data } = await getIdActors(id)
            setActorsData(data)
        }

        getActors()
    }, [id])
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

    function scrollToTop() {
        window.scrollTo(0, 0);
      }
    
      useEffect(() => {
        scrollToTop();
      }, []);
      
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
            <div class="cards-grid">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front" style={{ backgroundImage: `url(${actorsData.image})` }}>
                        </div>
                        <div class="flip-card-back">
                            {actorsData.name}
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='text-white'>Filmleri</h2>
            {movie.filter((item) => {
                if (item.type === "Film") { return item }
            }).filter((item) => {
                if (item.player.filter((item) => item.actorsid === id).length !== 0) {
                    return item
                }
            }).length === 0 ? (<h3>Filmi Bulunamadı</h3>) : (
                <div>
                    
                    <Carousel
                        responsive={responsive}
                    >
                        {movie.filter((item) => {
                            if (item.type === "Film") { return item }
                            else {
                                return
                            }
                        })
                            .filter(item => {
                                if (catagory === '') return item
                                else
                                    return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
                            })
                            .filter((item) => {
                                if (item.player.filter((item) => item.actorsid === id).length !== 0) {
                                    return item
                                }
                            })
                            .map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                    </Carousel>
                </div>
            )}

            <h2 className='text-white'>Dizileri</h2>
            {movie.filter((item) => {
                if (item.type === "Dizi") { return item }
            }).filter((item) => {
                if (item.player.filter((item) => item.actorsid === id).length !== 0) {
                    return item
                }
            }).length === 0 ? (<h3>Dizisi Bulunamadı</h3>) : (
                <div>
            <Carousel
                responsive={responsive}
            >
                {movie.filter((item) => {
                    if (item.type === "Dizi") { return item }
                    else {
                        return
                    }
                })
                    .filter(item => {
                        if (catagory === '') return item
                        else
                            return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
                    })
                    .filter((item) => {
                        if (item.player.filter((item) => item.actorsid === id).length !== 0) {
                            return item
                        }
                    })
                    .map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
            </Carousel>
            </div>
)           
            }
            

        </div>
    )
}

export default ActorsSearch